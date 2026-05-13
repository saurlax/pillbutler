import { useState } from "react";
import { BarcodeScanner } from "react-barcode-scanner";

function AddPillByScan() {
  const [code, setCode] = useState();

  return (
    <div>
      <BarcodeScanner onCapture={setCode} />
      <div>Result: {code}</div>
    </div>
  );
}

export default AddPillByScan;
