import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";


const getProvider = async () => {

    if ('phantom' in window) {
      const provider = (window.phantom as any).solana ;
  
      if (provider?.isPhantom) {
        const resp = await provider.connect()
        return resp.publicKey.toString()
      }
    }
};

export default function Address() {
  const [address, setAddress] = useState("Unknown Address");
  return (
    <div class="flex gap-2">
      <Button onClick={() => getProvider().then(res => setAddress(res))}>Get address</Button>
      {address}
    </div>
  );
}
