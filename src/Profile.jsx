import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Flex, Separator, Text } from "@chakra-ui/react";

function Profile({ gameSave, setGameSave }) {
  const [initialStats, setInitialStats] = useState(null);

  useEffect(() => {
    if (!initialStats && gameSave) {
      setInitialStats({ ...gameSave });
    }
  }, [gameSave]);

  const statItems = [
    { label: "STR" },
    { label: "INT" },
    { label: "VIT" },
    { label: "AGI" },
    { label: "DEX" },
    { label: "LUK" },
  ];

  if (!gameSave) {
    return <Text>Loading...</Text>;
  }

  //強化
  const addSkillPoint = (stat, value) => {
    const initialValue = initialStats[stat];

    if (value > 0 && gameSave.skillPoint > 0) {
      gameSave[stat] += value;
      gameSave.skillPoint -= value;
      setGameSave({ ...gameSave });
    } else if (value < 0 && gameSave[stat] + value >= initialValue) {
      gameSave[stat] += value;
      gameSave.skillPoint -= value;
      setGameSave({ ...gameSave });
    }
  };

  //儲存加點
  const saveSkillPonit = () => {
    const newGameSave = { ...gameSave };
    newGameSave.maxHp = 100 + newGameSave.VIT * 10;
    newGameSave.atk = 10 + newGameSave.STR * 2 + newGameSave.DEX * 1;
    newGameSave.def = 10 + newGameSave.VIT * 2;
    newGameSave.spd = 10 + newGameSave.AGI * 2 + newGameSave.DEX * 1;
    newGameSave.int = 10 + newGameSave.INT * 2;
    newGameSave.luk = 10 + newGameSave.LUK * 2;

    setGameSave(newGameSave);
    setInitialStats(newGameSave);
    localStorage.setItem("gameSave", JSON.stringify(newGameSave));
  };

  return (
    <>
      <Flex justify="center">
        <Flex direction="column" maxW="700px" w="90%">
          <Flex backgroundColor="gray.900" mt={4} p={4} borderRadius={8}>
            <Flex w="100%" direction="column">
              <Text fontWeight="bold" textStyle="lg">
                角色
              </Text>

              <Separator mt={2} mb={2} size="lg" />

              <Flex>
                <Flex minW="160px">
                  <Text>等級:&nbsp;{gameSave.lv}</Text>
                </Flex>
                <Flex minW="160px">
                  <Text>
                    經驗:&nbsp;{gameSave.exp}&nbsp;/&nbsp;{gameSave.nextExp}
                  </Text>
                </Flex>
                <Flex minW="160px">
                  <Text>金幣:&nbsp;{gameSave.money}</Text>
                </Flex>
              </Flex>

              <Separator variant="dashed" mt={2} mb={2} size="md" />

              <Flex>
                <Flex minW="160px">
                  <Text>血量:&nbsp;{gameSave.maxHp}</Text>
                </Flex>
                <Flex minW="160px">
                  <Text>攻擊:&nbsp;{gameSave.atk}</Text>
                </Flex>
                <Flex minW="160px">
                  <Text>防禦:&nbsp;{gameSave.def}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex minW="160px">
                  <Text>速度:&nbsp;{gameSave.spd}</Text>
                </Flex>
                <Flex minW="160px">
                  <Text>智力:&nbsp;{gameSave.int}</Text>
                </Flex>
                <Flex minW="160px">
                  <Text>幸運:&nbsp;{gameSave.luk}</Text>
                </Flex>
              </Flex>

              <Separator variant="dashed" mt={2} mb={2} size="md" />

              <Flex>
                <Flex minW="160px">
                  <Text>勝場:&nbsp;{gameSave.totalWin}</Text>
                </Flex>
                <Flex minW="160px">
                  <Text>敗場:&nbsp;{gameSave.totalLose}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Flex backgroundColor="gray.900" mt={4} p={4} borderRadius={8}>
            <Flex w="100%" direction="column">
              <Text fontWeight="bold" textStyle="lg">
                強化
              </Text>

              <Separator mt={2} mb={2} size="lg" />

              <Flex>
                <Flex minW="160px">
                  <Text>剩餘點數:&nbsp;{gameSave.skillPoint}</Text>
                </Flex>
              </Flex>

              <Separator variant="dashed" mt={2} mb={2} size="md" />

              <Flex wrap="wrap">
                {statItems.map((stat, index) => (
                  <Flex minW="200px" align="center" key={index} mb={2}>
                    <Text w="40px">{stat.label}:&nbsp;</Text>
                    <Button
                      variant="surface"
                      size="xs"
                      mr={2}
                      onClick={() => addSkillPoint(stat.label, -1)}
                    >
                      -1
                    </Button>
                    <Text w="30px" textAlign="center">
                      {gameSave[stat.label]}
                    </Text>
                    <Button
                      variant="surface"
                      size="xs"
                      ml={2}
                      onClick={() => addSkillPoint(stat.label, 1)}
                    >
                      +1
                    </Button>
                  </Flex>
                ))}
              </Flex>

              <Button onClick={() => saveSkillPonit()} mt={2}>
                確認
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Profile;
