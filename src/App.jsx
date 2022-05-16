import React  from "react"

import detectEthereumProvider from "@metamask/detect-provider"
import{Contract , ethers} from "ethers"
import myContractManifest from "./contracts/MyContract.json"
import Navbar from "./components/Navbar"
import Card from "./components/Card"

export default class App extends React.Component{
  

  constructor(props){
    super(props)
    this.initToAsync()
    
  }
  
  async initToAsync(){

  var myContract = await  this.getBlockchain()
  var data = await myContract.getAdoptedDogs()

  this.setState({
    myContract: myContract ,
    data : data
  })

  }



  async getBlockchain(){
    let provider = await detectEthereumProvider()
    if(provider){
     await  provider.request({method : "eth_requestAccounts"});

     provider = new ethers.providers.Web3Provider(provider)
     const signer = provider.getSigner()

     const MyContract = new Contract(
      myContractManifest.networks[97].address,
      myContractManifest.abi ,
      signer
       
     );

     return MyContract
    }

    return null
  }

   async clickAdoptedDog (index){
     const tx = await this.state.myContract.adopted(index)
     await tx.wait()

    const newdato = await this.state.myContract.getAdoptedDogs()
    this.Setstate({
      data : newdato
    })
   }

  render(){
    if(this.state == null || this.state.myContract == null|| this.state.data ==null){
      return "Loadinig"
    }
    
    const adoptionDivs = this.state.data.map((addressAdopcion , i)=>{

      if(addressAdopcion == ethers.constants.AddressZero){
        return (
                  
          <Card  onClick={(e)=>this.clickAdoptedDog(i) } i={i} key={i} /> 
          
        )
      }else {

        return ( <Card key={i} addressAdopcion={addressAdopcion} i={i} adopted={true}/>
         )
      }
    })

    return (
    <>
    <Navbar/>
    <div style={{alignItems:"center" ,display:"flex",flexDirection:"column"}}>{adoptionDivs}</div>
    </>
    )
  }
}