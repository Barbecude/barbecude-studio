const QRCode = require('qrcode');

async function run() {
  const str = "00020101021226610014COM.GO-JEK.WWW01189360091439776143080210G9776143080303UMI51440014ID.CO.QRIS.WWW0215ID10264927570120303UMI5204481653033605405150005802ID5923rakit.dev - Web Hosting6005MEDAN61052011662395028A120260616070903A6YiBrfaplID0703A016304E83A";
  const dataUrl = await QRCode.toDataURL(str, {
    width: 300,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });
  console.log(dataUrl.substring(0, 50) + "...");
}

run().catch(console.error);
