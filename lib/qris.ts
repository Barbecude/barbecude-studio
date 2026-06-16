export function crc16(str: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) > 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

export const BASE_QRIS = '00020101021126610014COM.GO-JEK.WWW01189360091433478331940210G3478331940303UMI51440014ID.CO.QRIS.WWW0215ID10243646355720303UMI5204541153033605802ID5919Aliii Pediaa, TAPOS6005DEPOK61051645162070703A0163044BED';

export function generateDynamicQRIS(amount: number): string {
  const qrisString = BASE_QRIS;
  
  // Find where the CRC tag (63) starts
  const crcIndex = qrisString.lastIndexOf('6304');
  let stringWithoutCRC = qrisString;
  if (crcIndex !== -1) {
    stringWithoutCRC = qrisString.substring(0, crcIndex);
  }

  // Change Point of Initiation Method from Static (11) to Dynamic (12)
  stringWithoutCRC = stringWithoutCRC.replace('010211', '010212');

  // Create Tag 54 for Transaction Amount
  const amountStr = amount.toString();
  const amountLength = amountStr.length.toString().padStart(2, '0');
  const tag54 = `54${amountLength}${amountStr}`;

  // Insert tag 54 before tag 63
  const payloadToCalculate = stringWithoutCRC + tag54 + "6304";
  
  // Calculate new CRC16
  const newCrc = crc16(payloadToCalculate);
  
  return payloadToCalculate + newCrc;
}
