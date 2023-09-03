import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import GenerateNft from '../artifacts/contracts/MyNFT.sol/GenerateNft.json';
import RandomShapeGenerator from './RandomGenerator';


const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, GenerateNft.abi, signer);


function Minted() {

  const [totalMinted, setTotalMinted] = useState(0);
  const [numFiles, setNumFiles] = useState(0);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getCount();
    fetchData();
  }, [files]);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  async function fetchData() {
    const agentRes = await fetch('http://localhost:3100/api/all')
    console.log(agentRes)
    agentRes
      .json()
      .then((res) => {
        console.log(res.fileNumber)
        setNumFiles(res.fileNumber)
        
      })
      .catch((err) => console.log(err))
  }

  return (
    <div>
      {/* <Header /> */}
      {/* <WalletBalance />
      <RandomShapeGenerator setFiles={setFiles} /> */}
      <h1 style={{display:'flex', justifyContent:'center',alignItems:'center',marginTop:'10px',marginBottom:'30px'}}>My minted Nfts</h1>
      <div className="container">
        <div className="row">
          {/* {Array(totalMinted + 1)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="col-sm">
                <NFTImage tokenId={i} getCount={getCount} />
              </div>
            ))} */}
                {Array(numFiles)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="col-4">
                <NFTImage tokenId={i} getCount={getCount} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function NFTImage({ tokenId, getCount }) {
  const contentId = 'Here goes the unique Id (IPFS)'; // pretstavuva edinstven identifikator na folder so fajlovite na generiranite nft (vo slucajov nie gi vnesuvana na ipfs preku pinata.com) istiot link moze da se prezeme od stranata na pinata.com.
  const metadataURI = `${contentId}/${tokenId}.png`;
  // const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`; linkot so koj sto pristapuvame do fajlovite na cloud.
  // megutoa poradi poefikasno testirajne na applikacijata i dobivajne ponadezni fajlovi (dobivanje na site sliki bez problem) odime preku prikazivajne na slikite lokalno od nasata masina.
  const imageURI = `server/generated_images/${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result)
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }
  return isMinted ? (
    
    <div className="card" style={{ width: '18rem' }}>
      {/* <img className="card-img-top" src={isMinted ? imageURI : 'img/placeholder.png'}></img> */}
      <img className="card-img-top" src={imageURI}></img>
      <div className="card-body">
        <h5 className="card-title">ID #{tokenId}</h5>
        {!isMinted ? (
          <button className="btn btn-primary" onClick={mintToken}>
            Mint
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={getURI}>
            Taken! Show URI
          </button>
        )}
      </div>
    </div>
    
  ): null
}

export default Minted;
