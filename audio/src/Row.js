import React from 'react';
function Row({rowData}){
    return (
        <tr>
        <td>{rowData?.filename}</td>
        <td>{rowData?.overall_tempo}</td>
        <td>{rowData?.peak_1}</td>
        <td>{rowData?.peak_2}</td>
    </tr>
    )

}
export default Row;