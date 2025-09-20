import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import { Input } from '@/components/ui/input'
import React from 'react'
import { PaginationElement } from '../../components/PaginationElement.jsx'
import { Card } from '@/components/ui/card.jsx'
import { Car } from 'lucide-react'
import BlogsDisplay from '@/components/BlogsDisplay.jsx'
import Footer from '@/components/Footer.jsx'

function ExplorePage() {
  return (
    <>
        <Navbar><Input/></Navbar>  {/* @TODO: ui adject */}
    {/* Hero */}
    <Hero/>
    {/* Popular Category */}   
    <section className='flex overflow-x-auto h-50'>
      <Card className='flex-shrink-0 h-7 m-8 p-10 w-52 text-center'>Popular Category</Card>
      <Card className='flex-shrink-0 h-7 m-8 p-10 w-52 text-center'>Popular Category</Card>
    </section>
    {/* blog suggestions */}   
    <BlogsDisplay/>
    {/* pagation */}
    <PaginationElement/>
    <Footer/>
    </>
  )
}

export default ExplorePage