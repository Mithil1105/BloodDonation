
import React from 'react'

import { Page,Text, Image, Document, StyleSheet } from '@react-pdf/renderer'


const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        borderWidth: 10,
        borderColor: 'red',
    },
    header : {
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold"
    },
    text : {
        margin: 12,
        fontSize: 20,
        textAlign: "justify",
    },

});

const PDFFile = () => (
  <Document>
    <Page style={styles.body} wrap={false}>
        <Text style={styles.header}>Thank you for your Donation!</Text>
        <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
    </Page>
  </Document>
);

export default PDFFile