import React from 'react';
import { css } from '@emotion/react';

export default function InquiryPage() {
  return (
    <div className='documentpage-body'>
    <div css={imgStyle}>
    <div className='document_background'>
         <div className="buildingBackground">
           <h2>
             효과적인 광고 전략과 광고주님의 목표에 부합하는 맞춤형 솔루션으로, <br /> 지금 바로 문의해보세요.
           </h2>
           
           <div></div>
           <img src="/images/building.png" alt="Building" className="buildingPicture" />
         </div>
    
         <div className="buildingBackground2">
           <img src="/images/phone.png" alt="Phone" className="phonePicture" />
           <ul>
             <li className='call_style'>
               <h3>전화문의 </h3> <h3/>010-5590-0482
             </li>
           </ul>
         </div>
    
        {/*  <div className="buildingBackground3">
           <ul>
             <li>전화문의 010-5590-0482</li>
           </ul>
           <div className="test">
             <img src="/images/callicon.png" alt="Call" className="call" />
           </div>
         </div> */}
       </div>
       </div>
      </div>
      );
    }
    
    const imgStyle = css`
    .document_background{
     
     
    }
    
      
    
      .buildingPicture {
        position: static;
        float: right;
        margin-top: 123px;
      }
    
      .button {
        background-color: rgb(151, 182, 233);
        color: rgb(255, 255, 255);
        border: none;
        border-radius: 10px;
        padding: 10px;
        width: 100px;
        font-size: 15px;
        position: absolute;
        top: 420px;
        left: 320px;
      }
    
      li {
        list-style: none;
      }
    
      h2 {
        position: absolute;
        top: 280px;
        left: 320px;
      }
    
      .phonePicture {
        max-width: 200px;
        position: absolute;
        top: 900px;
        left: 320px;
      }
    .buildingBackground {
        background-color: rgb(255, 255, 255);
        border-radius: 2px;
        border: 1px solid gray
        ;
        width: 1500px;
        height: 500px;
        position: static;
        margin-top: 100px;
        margin-left: 200px;
       
      }
      .buildingBackground2 {
        background-color: rgb(255, 255, 255);
        border-radius: 2px;
        border: 1px solid rgb(68, 68, 68);
        width: 1500px;
        height: 500px;
        position: static;
        margin-top: 100px;
        margin-left: 200px;
        margin-bottom: 100px
      }
    
      .buildingBackground3 {
        background-color: rgb(255, 255, 255);
        border-radius: 2px;
        border: 1px solid black;
        width: 1500px;
        height: 500px;
        position: static;
        margin-top: 100px;
        margin-left: 200px;
        margin-bottom: 200px;
      }
    
      .buildingBackground2 li {
        position: absolute;
        top: 900px;
        left: 700px;
        font-size: 30px;
      }
    
      .buildingBackground3 li {
        position: absolute;
        top: 1520px;
        left: 710px;
        font-size: 30px;
      }
    
      .call {
        max-width: 220px;
        position: absolute;
        top: 1450px;
        left: 330px;
        margin-left: -10px;
      }
    
      .n {
        color: red;
      }
      .call_style{
        font-size: 100px
      }
    `;
