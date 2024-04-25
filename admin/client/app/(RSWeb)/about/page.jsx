"use client";

import React from 'react'
import HeroView from './components/view/HeroView'
import LeadersView from './components/view/LeadersView'
import ServicesView from './components/view/ServicesView'
import Banner from '../common/banner/Banner'

const AboutPage = () => {
    return (
        <>
            <HeroView />
            <LeadersView />
            <ServicesView />
            <Banner />
        </>
    )
}

export default AboutPage