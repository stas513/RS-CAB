import React from 'react'
import Image from 'next/image'

const LeadersView = () => {
    return (
        <section className="max-w-subcontainer px-5 mx-auto my-24 space-y-5">
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-3 md:col-span-1">
                    <h3
                        className="text-green text-center md:text-left font-poppins text-4xl md:text-6xl font-semibold leading-normal">
                        RSCAB <br className="hidden md:block " /> <span className="text-black">Leadership</span>
                    </h3>
                </div>
                <div className="col-span-3 md:col-span-2">
                    <p className="font-poppins text-slate-600 text-justify  md:mt-32 leading-8">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum
                        adipisci id ipsa nam veniam rem eum laudantium, earum sint
                        obcaecati commodi optio quae sunt deserunt impedit corrupti aut.
                        Illo, maiores. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum
                        adipisci id ipsa nam veniam rem eum laudantium, earum sint
                        obcaecati commodi optio quae sunt deserunt impedit corrupti aut.
                        Illo, maiores.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-5">

                <div className="max-w-[370px] space-y-4">
                    <Image className="rounded-[17px] object-contain" width={371} height={276} src={"/webAssets/images/about/01.png"} alt="Magnus Olsson" />
                    <p className="font-poppins text-md md:text-4xl font-semibold ">Magnus Olsson</p>
                    <p className="font-poppins text-sm font-semibold text-slate-600">Co-Founder And CEO</p>
                    <Image width={32} height={32} src={"/webAssets/images/about/Group 1007.png"} alt="logo" />
                </div>


                <div className="max-w-[370px] space-y-4">
                    <Image className="rounded-[17px] object-contain" width={371} height={276} src={"/webAssets/images/about/02.png"} alt="Herry John Olsson" />
                    <p className="font-poppins text-md md:text-4xl font-semibold ">Herry John Olsson</p>
                    <p className="font-poppins text-sm font-semibold text-slate-600">Co-Founder And CEO</p>
                    <Image width={32} height={32} src={"/webAssets/images/about/Group 1007.png"} alt="logo" />
                </div>


                <div className="max-w-[370px] space-y-4">
                    <Image className="rounded-[17px] object-contain" width={371} height={276} src={"/webAssets/images/about/03.png"} alt="John Sams Hery" />
                    <p className="font-poppins text-md md:text-4xl font-semibold ">John Sams Hery</p>
                    <p className="font-poppins text-sm font-semibold text-slate-600">Co-Founder And CEO</p>
                    <Image width={32} height={32} src={"/webAssets/images/about/Group 1007.png"} alt="logo" />
                </div >


            </div >

        </section >
    )
}

export default LeadersView