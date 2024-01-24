import React from 'react'
import { CSVLink } from 'react-csv'

const ExportReactCSV = ({csvData, fileName}) => {
  return (
    <CSVLink data={csvData} filename={fileName}>Export</CSVLink>
  )
}

export default ExportReactCSV