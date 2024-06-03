import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HeroView = () => {
    return (
        <section className="max-w-container mx-auto">
            <div className="px-5 py-10 mx-5 min-h-[600px] rounded-large bg-hero-section bg-cover bg-center flex items-center">
                <div
                    className="max-w-subcontainer h-full mx-auto flex flex-col-reverse md:flex-row md:justify-between md:items-center">
                    <div className="flex justify-center flex-col md:w-1/2 text-center md:text-left">
                        <h3 className="text-green  font-poppins text-5xl font-medium">RS CAB</h3>
                        <h3 className="text-white  font-poppins text-5xl font-medium leading-normal">
                            Is Your Everyday, Everything Platform
                        </h3>
                        <p className="text-white  font-poppins my-5">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum
                            adipisci id ipsa nam veniam rem eum laudantium, earum sint
                            obcaecati commodi optio quae sunt deserunt impedit corrupti aut.
                            Illo, maiores.
                        </p>
                        <div className="flex justify-center md:justify-start space-x-3">
                            <Link href={'/auth/login?mode=passenger'}>
                            <button className="bg-green py-3 px-6 rounded-md font-semibold text-sm">
                                SIGN IN
                            </button>
                            </Link>

                            <button className="bg-green py-3 px-6 rounded-md font-semibold text-sm font-poppins">
                                DOWNLOAD THE APP
                            </button>
                        </div>
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