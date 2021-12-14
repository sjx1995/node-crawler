/*
 * @Description:
 * @Author: Sunly
 * @Date: 2021-11-01 18:08:54
 */
import { axios } from "../server/httpRequest/axios";
import { resolve } from "path";
import { writeFileSync } from "fs";

type IEpidemic = {
  lastUpdateTime: string;
  chinaTotal: IChinaTotal;
  chinaAdd: IChinaAdd;
  areaTree: IAreaTree[];
};

type IChinaTotal = {
  confirm: number;
  heal: number;
  dead: number;
  nowConfirm: number;
  suspect: number;
  nowSevere: number;
  importedCase: number;
  noInfect: number;
  showLocalConfirm: number;
  showlocalinfeciton: number;
  localConfirm: number;
  noInfectH5: number;
  localConfirmH5: number;
  local_acc_confirm: number;
};

type IChinaAdd = {
  confirm: number;
  heal: number;
  dead: number;
  nowConfirm: number;
  suspect: number;
  nowSevere: number;
  importedCase: number;
  noInfect: number;
  localConfirm: number;
  noInfectH5: number;
  localConfirmH5: number;
};

type IAreaTree = {
  name: "中国";
  today: {
    confirm: number;
    isUpdated: boolean;
  };
  total: {
    nowConfirm: number;
    confirm: number;
    suspect: number;
    dead: number;
    deadRate: string;
    showRate: boolean;
    heal: number;
    healRate: string;
    showHeal: true;
    wzz: number;
  };
  children: IProvince[];
};

type IProvince = {
  name: string;
  today: {
    confirm: number;
    confirmCuts: number;
    isUpdated: boolean;
    tip: string;
    wzz_add: number;
  };
  total: {
    nowConfirm: number;
    confirm: number;
    suspect: number;
    dead: number;
    deadRate: string;
    showRate: boolean;
    heal: number;
    healRate: string;
    showHeal: boolean;
    wzz: number;
  };
  children: IProvince[];
};

axios<{ data: string }>(
  "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5",
  "get"
).then(({ data }) => {
  // writeFileSync(resolve(__dirname, "./xinguan.txt"), data.data, {
  //   encoding: "utf-8",
  // });
  const epidemic: IEpidemic = JSON.parse(data);
  const { nowConfirm } = epidemic.chinaTotal;
  const { confirm, dead } = epidemic.chinaAdd;
  let msg = `截至${
    epidemic.lastUpdateTime
  }，国内现有确诊${nowConfirm}例，较昨日增加${confirm}例${
    dead !== 0 ? `；昨日新增死亡${dead}例` : null
  }：\n`;
  const china = epidemic.areaTree.find((item) => item.name === "中国");
  if (china) {
    china.children.forEach(
      ({ name, today: { confirm }, total: { nowConfirm } }) => {
        msg += `· ${name}: 新增${confirm}例，现有确诊${nowConfirm}例\n`;
      }
    );
  }
});
