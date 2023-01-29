
/**************************************************************************************************************
**                                                                                                           **
**  ISBN13 Check Digit Calculator                                                                            **
**                                                                                                           **
**************************************************************************************************************/


/**************************************************************************************************************
**                                                                                                           **
**  function Init()                                                                                          **
**                                                                                                           **
**  Takes the embedded Template for each character display in the entered code and replicates it for         **
**  the 12 allowable characters.                                                                             **
**                                                                                                           **
**  These could have been coded in the HTML, but this is more manageable for change.                         **
**                                                                                                           **
**************************************************************************************************************/

function Init() {
  var i_Template = document.getElementById("LineTemplate").innerHTML;
  var i_Html = "";

  for (let i_Idx = 0; i_Idx < 12; i_Idx++) {
    let i_Position = i_Idx + 1;
    i_Html += i_Template.replaceAll("_Index", "_" + i_Idx).replaceAll("_Position", i_Position); }
  document.getElementById("AnalysisArea").innerHTML = i_Html;
}


/**************************************************************************************************************
**                                                                                                           **
**  function Calculate()                                                                                     **
**                                                                                                           **
**  This is called by the onInput event of the code input field.                                             **
**                                                                                                           **
**  The code loops through each character entered, validating it and performing the ISBN13 logic on it.      **
**                                                                                                           **
**  Validation and computation is performed using the Chacter Code of each digit.  The code must be          **
**  within the range of the '0' through '9' character codes and if valid, the code for '0' is subtracted     **
**  from it to get its numeric value.                                                                        **
**                                                                                                           **
**  If the code entered is all numeric digits and 12 characters long, the check digit is calculated and      **
**  the completed 13 digit number is displayed formatted as the 'Result'.                                    **
**                                                                                                           **
**  If the completed number is displayed, this is also passed as the 'code' URL variable to                  **
**  /isbn13barcode.aspx which will return a barcode image for the completed number in the BarCode img.       **
**  Note, the BarCode creation code has not been validated, it is taken verbatim from an internet source.    **
**                                                                                                           **
**************************************************************************************************************/

function Calculate() {
  var i_Valid = true;
  var i_Result = "";
  var i_LowCode = "0".charCodeAt(0);
  var i_HighCode = i_LowCode + 9;
  var i_TheCode = document.getElementById("TheCode").value;
  var i_Char = "";
  var i_Code = 0;
  var i_Weight = 0;
  var i_Sum = 0;
  var i_TotalSum = 0;
  var i_BarCode = "https://www.mydocz.com/images/spacer.gif";
  
  for (let i_Idx=0; i_Idx < 12; i_Idx++) {
    if (i_Idx < i_TheCode.length) {
      i_Char = i_TheCode.substring(i_Idx, i_Idx + 1);
      i_Code = i_TheCode.charCodeAt(i_Idx);
      document.getElementById("Code_" + i_Idx).innerHTML = i_Char;
      if (i_Code < i_LowCode || i_Code > i_HighCode) {
        i_Valid = false;
        document.getElementById("Weight_" + i_Idx).innerHTML = "";
        document.getElementById("Sum_" + i_Idx).innerHTML = "Invalid"; }
      else {
        i_Weight = ((i_Idx % 2 == 0) ? 1 : 3);
        i_Sum = (i_Code - i_LowCode) * i_Weight;
        i_TotalSum += i_Sum;
        document.getElementById("Weight_" + i_Idx).innerHTML = i_Weight;
        document.getElementById("Sum_" + i_Idx).innerHTML = i_Sum; } }
    else {
      document.getElementById("Code_" + i_Idx).innerHTML = "";
      document.getElementById("Weight_" + i_Idx).innerHTML = "";
      document.getElementById("Sum_" + i_Idx).innerHTML = ""; } }
    if (i_Valid == true) {
      if (i_TheCode.length == 12) {
        let i_Check = 10 - (i_TotalSum % 10);
        if (i_Check == 10) {
          i_Check = 0; }
        i_Result = i_TheCode.substring(0,3) + "-" + i_TheCode.substring(3,4) + "-" + i_TheCode.substring(4,6) + "-" + i_TheCode.substring(6,12) + "-" + i_Check;
        i_BarCode = "https://www.mydocz.com/isbn13barcode.aspx?code=" + i_TheCode + i_Check; }
      else if(i_TheCode.length > 12) {
        i_Result = "To Long, Not 12 Digits"; } }
    document.getElementById("Result").innerHTML = i_Result;
    document.getElementById("BarCode").src = i_BarCode;
}
