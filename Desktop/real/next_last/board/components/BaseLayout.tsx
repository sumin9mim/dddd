import Header from "./Header";

// export default function BaseLayout({ children}: Readonly<{
//   children: React.ReactNode;}>) 
  export default function BaseLayout({ children }: { children: React.ReactNode }){
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
