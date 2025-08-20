// "use client";

// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";

// import { toast } from "react-toastify";

// const notify = () => toast("Вы сменили тему сайта!", { autoClose: 1300 });

// const Switch = () => {
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     // Проверяем, есть ли явное предпочтение в localStorage
//     const hasStoredPreference = "theme" in localStorage;

//     // Если есть сохранённая настройка - используем её
//     if (hasStoredPreference) {
//       const isDarkMode = localStorage.theme === "dark";
//       setIsDark(isDarkMode);
//       document.documentElement.classList.toggle("dark", isDarkMode);
//     } else {
//       // Если нет сохранённой настройки - устанавливаем светлую тему
//       localStorage.theme = "light";
//       setIsDark(false);
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = isDark ? "light" : "dark";
//     localStorage.theme = newTheme;
//     document.documentElement.classList.toggle("dark", newTheme === "dark");
//     setIsDark(!isDark);
//   };

//   return (
//     <Button
//       onClick={() => {
//         toggleTheme();
//         notify();
//       }}
//       className="bg-[#F5F2F0] hover:bg-[#ebe6e3] h-[48px] cursor-pointer"
//     >
//       {isDark ? (
//         <img src="/theme.png" alt="" className="w-[20px] h-[20px]" />
//       ) : (
//         <img src="/sun.png" alt="" className="w-[20px] h-[20px]" />
//       )}
//     </Button>
//   );
// };

// export default Switch;
