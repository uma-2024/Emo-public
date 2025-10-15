import React from 'react'
import ReserveAccessCard from '../ReserveAccessCard/ReserveAccessCard'
import TokenSaleSection from '../TokenSaleSection/TokenSaleSection'
import PreSaleConnect from '../PreSaleConnect/PreSaleConnect'
import TokenomicsComponent from '../TokenomicsComponent/TokenomicsComponent'
import Claim from '../Claim/Claim'

const PreSale = () => {
  return (
    <div>
      
      <PreSaleConnect/>
      <ReserveAccessCard/>
      <Claim/>
      <TokenSaleSection/>
      
      <TokenomicsComponent/>
    </div>
  )
}

export default PreSale
