
/**************************************************************************************************************
**                                                                                                           **
**  Handler to create Bookland object given 'code' variable containing a valid ISBN13 number                 **
**  and return the barcode png format image created by it back to the browser.                               **
**                                                                                                           **
**  Note :                                                                                                   **
**    *  No validation is performed on the code variable.                                                    **
**    *  The Bookland class has not been validate to create valid ISBN13 barcodes.                           **
**                                                                                                           **
**************************************************************************************************************/

<%@ Page language="C#" Debug="true" %>
<%@ Import Namespace="System"%>

<script language="C#" runat="server">

	void Page_Load(object sender, System.EventArgs e)
	{
		HttpRequest i_Request = System.Web.HttpContext.Current.Request;
		string i_Code = "";
		if (i_Request["code"] == null) {
			i_Code = ""; }
		else {
			i_Code = i_Request["code"].ToString(); }
		using (Bookland bookland = new Bookland(i_Code)) {
			// GM: return File(bookland.BinaryImage, "image/png");
			Response.ContentType = "image/png";
			Response.BinaryWrite(bookland.BinaryImage);
			Response.Flush(); 
			 }
	}
</script>
