
import React,{ useState} from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { UserData } from "./Data";
import "./index.css"


const Index = () => {
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained",
                data: UserData.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });

    // IF YOU SEE THIS COMMENT: I HAVE GOOD EYESIGHT

    return (
        <>
            <div className="containerChart row">
                <div style={{ width: 500 }} className="contenu_Chart">
                    <BarChart chartData={userData} />
                </div>
                <div style={{ width: 500 }} className="contenu_Chart">
                    <LineChart chartData={userData} />
                </div>
                {/* <div style={{ width: 700 }}>
                    <PieChart chartData={userData} />
                </div> */}
            </div>
        </>
    )
}

export default Index
