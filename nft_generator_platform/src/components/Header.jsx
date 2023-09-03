import { Link } from "react-router-dom";
function Header() { 
  
    return (
        <nav class="navbar navbar-expand-lg bg-primary bg-body-tertiary">
  <div class="container-fluid">
  <a class="navbar-brand text-white" href="#">Nft Generator Logo goes here</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">   
      </ul>
      <span class="navbar-text">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#"><Link className='nav-link text-white' to="/Home">Home</Link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><Link className='nav-link text-white' to="/Generate">Generator of Nfts</Link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><Link className='nav-link text-white' to="/Minted">My Minted Nfts</Link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><Link className='nav-link text-white' to="/Members">Project Members</Link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><Link className='nav-link text-white' to="/About">About The Project</Link></a>
        </li>
      </ul>
      </span>
    </div>
  </div>
</nav>
    );
  };
  
  export default Header;