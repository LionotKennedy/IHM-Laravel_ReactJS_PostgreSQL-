import React from "react";
import "./table.css";

const Teste = () => {
  return (
    <>
      <div>
        <main className="tables mains" id="customers_table">
          {/* <div> */}
          <section className="table__headers">
            <h1>Joueur</h1>
            <div className="input-group">
              <input
                className="inputs"
                type="search"
                placeholder="Search Data..."
              />
              {/* <img src="" alt="" /> */}
            </div>
            <div className="export__file">
              <label
                for="export-file"
                className="export__file-btn labels"
                title="Export File"
              ></label>
              <input className="inputs" type="checkbox" id="export-file" />
              <div className="export__file-options">
                <label className="labels">Export As &nbsp; &#10140;</label>
                <label className="labels" for="export-file" id="toPDF">
                  PDF <img className="imgs" src="" alt="" />
                </label>
                <label className="labels" for="export-file" id="toJSON">
                  JSON <img className="imgs" src="" alt="" />
                </label>
                <label className="labels" for="export-file" id="toCSV">
                  CSV <img className="imgs" src="" alt="" />
                </label>
                <label className="labels" for="export-file" id="toEXCEL">
                  EXCEL <img className="imgs" src="" alt="" />
                </label>
              </div>
            </div>
          </section>
          {/* </div> */}

          {/* <div> */}
          <section className="table__bodys">
            <table className="tables">
              <thead className="theads">
                <tr className="trs">
                  <th className="ths">
                    {" "}
                    Id <span className="icon-arrow spans"></span>
                  </th>
                  <th className="ths">
                    {" "}
                    Customer <span className="icon-arrow spans"></span>
                  </th>
                  <th className="ths">
                    {" "}
                    Location <span className="icon-arrow spans"></span>
                  </th>
                  <th className="ths">
                    {" "}
                    Order Date <span className="icon-arrow spans"></span>
                  </th>
                  <th className="ths">
                    {" "}
                    Status <span className="icon-arrow spans"></span>
                  </th>
                  <th className="ths">
                    {" "}
                    Amount <span className="icon-arrow spans"></span>
                  </th>
                  <th className="ths">
                    {" "}
                    Amount <span className="icon-arrow spans"></span>
                  </th>
                  <th className="ths">
                    {" "}
                    Amount <span className="icon-arrow spans"></span>
                  </th>
                  <th className="ths">
                    {" "}
                    Amount <span className="icon-arrow spans"></span>
                  </th>
                  <th className="ths">
                    {" "}
                    Amount <span className="icon-arrow spans"></span>
                  </th>
                </tr>
              </thead>
              <tbody className="tbodys">
                <tr className="trs">
                  <td className="tds"> 1 </td>
                  <td className="tds">
                    {" "}
                    {/* <img src="images/Zinzu Chan Lee.jpg" alt="" /> */}
                    Zinzu Chan Lee
                  </td>
                  <td className="tds"> Seoul </td>
                  <td className="tds"> 17 Dec, 2022 </td>
                  <td className="tds">
                    <p className="status delivered">Delivered</p>
                  </td>
                  <td className="tds">
                    {" "}
                    <strong> $128.90 </strong>
                  </td>
                </tr>

              </tbody>
            </table>
          </section>
          {/* </div> */}
        </main>
      </div>
    </>
  );
};
export default Teste;
