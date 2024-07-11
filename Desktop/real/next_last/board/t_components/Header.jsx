// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import auth from "@/net/auth";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
// import { nanoid } from "nanoid";

// const selector = "#payment-widget";
// const widgetClientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
// const customerKey = nanoid();

// export default function Header() {
//   const [user, setUser] = useState(null);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [showInfoModal, setShowInfoModal] = useState(false);
//   const [paymentWidget, setPaymentWidget] = useState(null);
//   const paymentMethodsWidgetRef = useRef(null);
//   const [price, setPrice] = useState(50000);
//   const [coins, setCoins] = useState(0); // Replace with actual coin fetching logic
//   const router = useRouter();

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });
//   }, []);

//   useEffect(() => {
//     const fetchPaymentWidget = async () => {
//       try {
//         const loadedWidget = await loadPaymentWidget(
//           widgetClientKey,
//           customerKey
//         );
//         setPaymentWidget(loadedWidget);
//       } catch (error) {
//         console.error("Error fetching payment widget:", error);
//       }
//     };

//     fetchPaymentWidget();
//   }, []);

//   useEffect(() => {
//     if (paymentWidget == null) {
//       return;
//     }

//     const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
//       selector,
//       { value: price },
//       { variantKey: "DEFAULT" }
//     );

//     paymentWidget.renderAgreement({ variantKey: "AGREEMENT" });

//     paymentMethodsWidgetRef.current = paymentMethodsWidget;
//   }, [paymentWidget, price]);

//   useEffect(() => {
//     const paymentMethodsWidget = paymentMethodsWidgetRef.current;

//     if (paymentMethodsWidget == null) {
//       return;
//     }

//     paymentMethodsWidget.updateAmount(price);
//   }, [price]);

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       router.push("/sign-in"); // 로그아웃 후 로그인 페이지로 이동
//     } catch (error) {
//       console.error("로그아웃 중 에러 발생:", error);
//     }
//   };

//   const handleShowPaymentModal = () => {
//     setShowPaymentModal(true);
//   };

//   const handleClosePaymentModal = () => {
//     setShowPaymentModal(false);
//   };

//   const handleShowInfoModal = () => {
//     setShowInfoModal(true);
//   };

//   const handleCloseInfoModal = () => {
//     setShowInfoModal(false);
//   };

//   const handlePaymentRequest = async () => {
//     try {
//       await paymentWidget?.requestPayment({
//         orderId: nanoid(),
//         orderName: "충전 금액",
//         successUrl: `${window.location.origin}/success`,
//         failUrl: `${window.location.origin}/fail`,
//       });
//     } catch (error) {
//       console.error("Error requesting payment:", error);
//     }
//   };

//   const handleAmountSelect = (amount) => {
//     setPrice(amount);
//   };

//   return (
//     <header className="mb-9 border-b border-gray-400 p-3 flex justify-between items-center">
//       <div className="flex items-center space-x-4">
//         <div className="text-xl font-bold">QuantumJump NoticeBoard</div>
//         {user && (
//           <>
//             <button
//               onClick={handleShowPaymentModal}
//               className="bg-yellow-500 text-white font-bold text-sm px-3 py-1 rounded-full hover:bg-yellow-600 transition duration-300"
//             >
//               충전
//             </button>
//             <button
//               onClick={handleShowInfoModal}
//               className="bg-blue-500 text-white font-bold text-sm px-3 py-1 rounded-full hover:bg-blue-600 transition duration-300"
//             >
//               나의 정보
//             </button>
//           </>
//         )}
//       </div>
//       <div className="flex items-center">
//         {user ? (
//           <button
//             onClick={handleSignOut}
//             className="bg-red-500 text-white font-bold text-xs px-3 py-1 rounded-full hover:bg-red-600 transition duration-300"
//           >
//             로그아웃
//           </button>
//         ) : (
//           <div className="flex space-x-4">
//             <Link href="/sign-in">
//               <button className="bg-green-500 text-white font-bold text-sm px-3 py-1 rounded-full hover:bg-green-600 transition duration-300">
//                 로그인
//               </button>
//             </Link>
//             <Link href="/sign-up">
//               <button className="bg-blue-500 text-white font-bold text-sm px-3 py-1 rounded-full hover:bg-blue-600 transition duration-300">
//                 회원가입
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>
//       {showPaymentModal && (
//         <Modal onClose={handleClosePaymentModal}>
//           <div className="space-y-4">
//             <button
//               className="bg-gray-200 w-full p-2 rounded"
//               onClick={() => handleAmountSelect(1000)}
//             >
//               1,000원
//             </button>
//             <button
//               className="bg-gray-200 w-full p-2 rounded"
//               onClick={() => handleAmountSelect(5000)}
//             >
//               5,000원
//             </button>
//             <button
//               className="bg-gray-200 w-full p-2 rounded"
//               onClick={() => handleAmountSelect(10000)}
//             >
//               10,000원
//             </button>
//             <button
//               className="mt-4 bg-gray-300 w-full p-2 rounded"
//               onClick={handlePaymentRequest}
//             >
//               결제하기
//             </button>
//             <button
//               className="mt-4 bg-gray-300 w-full p-2 rounded"
//               onClick={handleClosePaymentModal}
//             >
//               닫기
//             </button>
//           </div>
//           <div id="payment-widget" />
//           <div id="agreement" />
//         </Modal>
//       )}
//       {showInfoModal && (
//         <Modal onClose={handleCloseInfoModal}>
//           <div className="space-y-4">
//             <div>
//               <strong>이메일:</strong> {user?.email}
//             </div>
//             <div>
//             <strong>비밀번호:</strong> ******
//             </div>
//             <div>
//               <strong>코인:</strong> {coins}
//             </div>
//             <button
//               className="mt-4 bg-gray-300 w-full p-2 rounded"
//               onClick={handleCloseInfoModal}
//             >
//               닫기
//             </button>
//           </div>
//         </Modal>
//       )}
//     </header>
//   );
// }

// function Modal({ onClose, children }) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded shadow-lg relative">
//         <button
//           onClick={onClose}
//           className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
//         >
//           ✖
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// }