import React from 'react'
import {footer_data, assets} from "../assets/assets"
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
        <div className='flex flex-col md:flex-row justify-between items-start gap-10 border-b border-gray-500/30 text-gray-500 py-10'>
            <div>
                <img src={assets.logo} alt="logo" className='w-32 sm:w-44' />
                <p className='max-w-[410px] mt-6'>BlogSage is an AI-powered blogging platform that generates high-quality blog content based on your provided title and outline. Ideal for writers, educators, and content creators seeking intelligent automation and organization.</p>
            </div>

            <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
                {footer_data.map((section, index)=> (
                    <div key={index}>
                        <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>

                        <ul className='text-sm space-y-1'>{section.links.map((link, i) => (
                            <li key={i}>
                                <Link to="/" className='hover:underline transition'>{link}</Link>
                            </li>
                        ))}
                        </ul>

                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Footer