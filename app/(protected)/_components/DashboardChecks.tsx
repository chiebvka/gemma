import React from 'react'
import Steps from './Steps'

type Props = {}
const users = "Ebuka"

export default function DashboardChecks({}: Props) {
  return (
    <div className='w-full  space-y-3 '>
        <Steps title={`Hi ${users} Let's get ypu set up`}  stepLink='' >
            Please click me to set up your name, logo, email, address, mobile and a color preset if you're feeling funky to prepoulate your invoices and recipts
        </Steps>
        <Steps title='Set up your payment method'  stepLink='/protected/finances' >
            And over here we have a few payment methods for you to choose from to help incorporate them into your invoices
            
        </Steps>
        <Steps title='Create your first recepient'  stepLink='' >
            Feel like playing around to understand us better, create your first repeat customer and add them to your recepient list PS. You can also do that directly when filling an invoice
        </Steps>
    </div>
  )
}