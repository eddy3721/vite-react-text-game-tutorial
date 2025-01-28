import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Profile from "./Profile";
import Battle from "./Battle";

function App() {
  const navigate = useNavigate();
  const [gameSave, setGameSave] = useState(null);

  const menuItems = [
    {
      label: "角色",
      path: "/",
      element: <Profile gameSave={gameSave} setGameSave={setGameSave} />,
    },
    {
      label: "戰鬥",
      path: "/battle",
      element: <Battle gameSave={gameSave} setGameSave={setGameSave} />,
    },
  ];

  // 檢查存檔
  const loadGameSave = () => {
    const data = localStorage.getItem("gameSave");
    if (!data) {
      //如果存檔不存在，則建立新存檔
      const newData = {
        name: "王小明",
        lv: 1,
        exp: 0,
        nextExp: 100,
        money: 81000,
        maxHp: 100,
        atk: 10,
        def: 10,
        spd: 10,
        int: 10,
        luk: 10,
        totalWin: 0,
        totalLose: 0,
        skillPoint: 10,
        STR: 0,
        INT: 0,
        VIT: 0,
        AGI: 0,
        DEX: 0,
        LUK: 0,
      };
      localStorage.setItem("gameSave", JSON.stringify(newData));
      console.log("已建立新檔");

      return newData;
    } else {
      console.log("已讀取存檔");

      return JSON.parse(data);
    }
  };

  useEffect(() => {
    setGameSave(loadGameSave());
  }, []);

  /*useEffect(() => {
    console.log(gameSave);
  }, [gameSave]);*/

  return (
    <>
      {/*迴圈生成按鈕*/}
      <Flex backgroundColor="gray.900" justify="center">
        {menuItems.map((item) => (
          <Button
            backgroundColor="gray.800"
            _hover={{ backgroundColor: "gray.700" }} // 滑鼠懸停時的背景顏色
            borderRadius="0px" //圓角
            key={item.path}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </Button>
        ))}
      </Flex>

      <Routes>
        {/*迴圈生成Route*/}
        {menuItems.map((item) => (
          <Route key={item.path} path={item.path} element={item.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
