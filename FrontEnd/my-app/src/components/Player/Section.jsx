import React from "react";
import "../NavBar/navbar.css"
// import "./fory.css"

const Section = () => {
    return (
        <>
            <div className="main-top">
                <h5>Attendance</h5>
                <i className="fas fa-user-cog"></i>
            </div>
            <div className="users">
                <div className="card">
                    <img className="image" src="./pic/img1.jpg"></img>
                    {/* <h4>Sam David</h4> */}
                    <h4 className="h4p">
                        Fory
                    </h4>
                    <p className="pp">Ui designer</p>
                    <div className="per">
                        <table className="tables">
                            <tr className="trs">
                                <td className="tds"><span className="spans">85%</span></td>
                                <td className="tds"><span className="spans">87%</span></td>
                            </tr>
                            <tr className="trs">
                                <td className="tds">Month</td>
                                <td className="tds">Year</td>
                            </tr>
                        </table>
                    </div>
                    <button className="buttons">Profile</button>
                </div>
                <div className="card">
                    <img className="image" src="./pic/img2.jpg"></img>
                    {/* <h4>Balbina kherr</h4> */}
                    <h4 className="h4p">
                        Fory
                    </h4>
                    <p className="pp">Progammer</p>
                    <div className="per">
                        <table className="tables">
                            <tr className="trss">
                                <td className="tds"><span className="spans">82%</span></td>
                                <td className="tds"><span className="spans">85%</span></td>
                            </tr>
                            <tr className="trss">
                                <td className="tds">Month</td>
                                <td className="tds">Year</td>
                            </tr>
                        </table>
                    </div>
                    <button className="buttons">Profile</button>
                </div>
                <div className="card">
                    <img className="image" src="./pic/img3.jpg"></img>
                    {/* <h4>Badan John</h4> */}
                    <h4 className="h4p">
                        Fory
                    </h4>
                    <p className="pp">tester</p>
                    <div className="per">
                        <table className="tables">
                            <tr className="trs">
                                <td className="tds"><span className="spans">94%</span></td>
                                <td className="tds"><span className="spans">92%</span></td>
                            </tr>
                            <tr className="trs">
                                <td className="tds">Month</td>
                                <td className="tds">Year</td>
                            </tr>
                        </table>
                    </div>
                    <button className="buttons">Profile</button>
                </div>
                <div className="card">
                    <img className="image" src="./pic/img4.jpg"></img>
                    {/* <h4>Salina micheal</h4> */}
                    <h4 className="h4p">
                        Fory
                    </h4>
                    <p className="pp">Ui designer</p>
                    <div className="per">
                        <table className="tables">
                            <tr className="trs">
                                <td className="tds"><span className="spans">85%</span></td>
                                <td className="tds"><span className="spans">82%</span></td>
                            </tr>
                            <tr className="trs">
                                <td className="tds">Month</td>
                                <td className="tds">Year</td>
                            </tr>
                        </table>
                    </div>
                    <button className="buttons">Profile</button>
                </div>
            </div>
        </>
    )
}

export default Section;