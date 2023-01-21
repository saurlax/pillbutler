import { useState } from "react";
import { BarcodeScanner } from "react-barcode-scanner";

function AddPillByScan() {
  const [code, setCode] = useState();

  return (
    <div>
      <BarcodeScanner
        onCapture={(v) => {
          console.log(v);
          setCode(v);
        }}
      />
      <div>Result: {code}</div>
    </div>
  );
}

export default AddPillByScan;
