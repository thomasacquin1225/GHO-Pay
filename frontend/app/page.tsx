import TabbedForms from "@/components/Main";
import Navbar from "@/components/Navbar";
// export { ConnectKitProvider, getDefaultConfig } from "connectkit";

export default function Main() {
  return (
    <main className="h-full overflow">
      <Navbar />
      <TabbedForms />
    </main>
  );
}
