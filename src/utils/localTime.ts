/*
 * @Description: 设置+08:00时区
 * @Author: Sunly
 * @Date: 2021-10-25 11:11:46
 */
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.tz.setDefault("Asia/Shanghai");

export default dayjs;
