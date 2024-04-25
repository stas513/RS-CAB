import React, { useEffect, useState } from 'react';

import {
    SafeAreaView,
    Switch,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
  import { Feather } from '@expo/vector-icons';
  import * as Animatable from 'react-native-animatable';
  import Collapsible from 'react-native-collapsible';
  import Accordion from 'react-native-collapsible/Accordion';

const CONTENT = [
    {
      title: 'Found an item in the car',
      content:
        'The following terms and conditions,m r employer, employees, agents, contractors and any other entity on whose behalf you accept these terms (collectively, “you” and “your”), and ServiceNow, Inc. (“ServiceNow,” “we,” “us” and “our”).',
    },
    {
      title: 'Issues with the passangers',
      content:
        'A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users, what kind of personal data you collect and what you do with that data.',
    },
    {
      title: 'Vehciel damage',
      content:
        'Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.',
    },
    {
      title: 'I was involved in an accident',
      content:
        'Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.',
    },
    {
      title: 'Review my earnings breakdown',
      content:
        'Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.',
    },
    {
      title: 'Found an item in the car',
      content:
        'The following terms and conditions,m r employer, employees, agents, contractors and any other entity on whose behalf you accept these terms (collectively, “you” and “your”), and ServiceNow, Inc. (“ServiceNow,” “we,” “us” and “our”).',
    },
    {
      title: 'Issues with the passangers',
      content:
        'A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users, what kind of personal data you collect and what you do with that data.',
    },
    {
      title: 'Vehciel damage',
      content:
        'Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.',
    },
    {
      title: 'I was involved in an accident',
      content:
        'Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.',
    },
    {
      title: 'Review my earnings breakdown',
      content:
        'Our Return & Refund Policy template lets you get started with a Return and Refund Policy agreement. This template is free to download and use.According to TrueShip study, over 60% of customers review a Return/Refund Policy before they make a purchasing decision.',
    },
  ];
const GetHelpCoolaps = () => {



   const [activeSections, setActiveSections] = useState([]);
   const [collapsed, setCollapsed] = useState(true);
   const [multipleSelect, setMultipleSelect] = useState(false);
   const toggleExpanded = () => {
     setCollapsed(!collapsed);
   };
   const setSections = (sections) => {
     setActiveSections(sections.includes(undefined) ? [] : sections);
   };
   const renderHeader = (section, _, isActive) => {

     return (
       <Animatable.View
         duration={400}
         style={[styles.header, isActive ? styles.active : styles.inactive]}
         transition="backgroundColor">
         <Text style={styles.headerText}>{section.title}</Text>
         {isActive? <Feather name="chevron-down" size={24} color="black" />: <Feather name="chevron-right" size={24} color="black" />}
       </Animatable.View>
     );
   };

   const renderContent = (section, _, isActive) => {
     //Accordion Content view
     return (
       <Animatable.View
         duration={400}
         style={[styles.content, isActive ? styles.active : styles.inactive]}
         transition="backgroundColor">
         <Animatable.Text
           animation={isActive ? 'bounceIn' : undefined}
           style={{ textAlign: 'center' }}>
           {section.content}
         </Animatable.Text>
       </Animatable.View>
     );
   };

   return (
     <SafeAreaView style={{ flex: 1 }}>
       <View style={styles.container}>
         <ScrollView showsVerticalScrollIndicator={false}>
           <Accordion
             activeSections={activeSections}
             sections={CONTENT}
             touchableComponent={TouchableOpacity}
             expandMultiple={multipleSelect}
             renderHeader={renderHeader}
             renderContent={renderContent}
             duration={400}
             onChange={setSections}
           />
         </ScrollView>
       </View>
     </SafeAreaView>
   );
};




export default GetHelpCoolaps;

const styles = StyleSheet.create({
      header: {
        padding: 10,
        flexDirection:'row',
        justifyContent:"space-between"
      },
      headerText: {
        textAlign: 'left',
        fontSize: 16,
        fontWeight: '500',
      },
      content: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius:10,
      },
});
