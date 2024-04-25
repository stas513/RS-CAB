import React from 'react'
import Image from 'next/image'

const HeroView = () => {
    return (
        <section className="max-w-container mx-auto">
            <div className="px-5 py-10 mx-5 min-h-[600px] rounded-large bg-hero-section bg-cover bg-center flex items-center">
                <div
                    className="max-w-subcontainer h-full mx-auto flex flex-col-reverse md:flex-row md:justify-between md:items-center">
                    <div className="flex justify-center flex-col md:w-3/4 text-center md:text-left">
                        <h3 className="text-white font-poppins text-3xl font-medium">ABOUT US</h3>
                        <h3 className="text-white font-poppins text-6xl font-medium leading-normal">
                            FREEDOM OF CHOICE WITH <span className="text-green">RS CAB</span>
                        </h3>
                        <p className="text-white font-poppins my-5 leading-8">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum
                            adipisci id ipsa nam veniam rem eum laudantium, earum sint
                            obcaecati commodi optio quae sunt deserunt impedit corrupti aut.
                            Illo, maiores. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum
                            adipisci id ipsa nam veniam rem eum laudantium, earum sint
                            obcaecati commodi optio quae sunt deserunt impedit corrupti aut.
                            Illo, maiores.
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <Image className="" width={425} height={425} src={"/webAssets/images/home/header logo.png"} alt="" />
                    </div>
                </div>
            </div>
        </section>

    )
}

export default HeroView