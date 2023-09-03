import React, { useState } from 'react'
import { ethers } from 'ethers'
// import NFTGen from '../artifacts/contracts/NftContract.sol/NFTGEN.json'

// const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

// const provider = new ethers.providers.Web3Provider(window.ethereum)

// // get the end user
// const signer = provider.getSigner()

// // get the smart contract
// const contract = new ethers.Contract(contractAddress, NFTGen.abi, signer)

const RandomShapeGenerator = ({setFiles}) => {
  const [shapes, setShapes] = useState([])
  const emojis = [
    '❤️',
    '⭐️',
    '✨',
    '🌻',
    '🌈',
    '🐱',
    '🦄',
    '🍉',
    '🎉',
    '🌸',
    '🐼',
    '🐠',
    '🍕',
    '🚀',
    '🌊',
  ]

  const generateRandomShapes = () => {
    const nodes = []
    const shapeCount = 16 // Number of shapes to generate

    for (let i = 0; i < shapeCount; i++) {
      const randomBackground = getRandomBackground()
      const randomEmoji = getRandomEmoji()
      const position = { row: Math.floor(i / 4), column: i % 4 }
      console.log('test')
      nodes.push(
        Node({ emoji: randomEmoji, background: randomBackground, position }),
      )
    }

    setShapes(nodes)
    // Convert the nodes array to JSON format
    const nodesJson = JSON.stringify(nodes)

    // Send the nodes data to the backend
    fetch('http://localhost:3100/api/save-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: nodesJson,
    })
      .then((response) => {
        if (response.ok) {
          console.log('Image saved successfully')
          setFiles(["test"])
        } else {
          console.error('Error saving image')
        }
      })
      .catch((error) => {
        console.error('Error saving image:', error)
      })
  }

  const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length)
    return emojis[randomIndex]
  }

  const getRandomBackground = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
    return randomColor
  }

  const getBlendedImage = () => {
    return (
      <div
        style={{
          width: '400px',
          height: '400px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
        }}
      >
        {shapes.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: item.background,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '40px',
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>
    )
  }

  const mintGeneratedDrawing = () => {
    return
  }
  const Node = ({ emoji, background, position }) => ({
    emoji,
    background,
    position,
  })

  return (
    <div>
      <div className="flex text-center justify-center mt-4 ">
        <div className='container bg-primary-subtle' style={{width:'500px',height:'500px', border:'2px solid red',borderColor:'red',display:'flex', justifyContent:'center',alignItems:'center'}}>

<div style={{width:'500px',height:'500px',display:'flex', justifyContent:'center',alignItems:'center'}}>
<div style={{width:'400px',height:'400px',display:'flex', justifyContent:'center',alignItems:'center'}}>
{getBlendedImage()}
</div>
</div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="container text-center flex-col">
          <div className="flex flex-col justify-center ">
            <div>
              <button
                className="btn btn-primary p-3"
                onClick={generateRandomShapes}
              >
                Generate NFT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RandomShapeGenerator
