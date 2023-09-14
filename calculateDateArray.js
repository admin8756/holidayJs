// 日期处理工具
const findDatePattern = (input) => {
  /**
   * 判断是否是正确的日期
   * @param {String} date 日期
   * @returns {Boolean} 日期是否正确
   */
  const isValidDate = (date) => {
    const dateObj = new Date(date);
    return !isNaN(dateObj.getTime());
  };

  /**
   * 判断是否是连续的日期
   * @param {Array} dates 日期合集
   * @returns {Boolean} 日期是否连续
   */
  const isContinuous = (dates) => {
    // 循环日期
    for (let i = 0; i < dates.length - 1; i++) {
      // 获取当前日期
      const currentDate = new Date(dates[i]);
      // 获取下一个日期
      const nextDate = new Date(dates[i + 1]);
      // 判断日期是否连续
      if (currentDate.getTime() + 24 * 60 * 60 * 1000 !== nextDate.getTime()) {
        return false;
      }
    }
    return true;
  };

  /**
   * 判断日期合集中是否跨年
   * @param {Array} dates 日期合集
   * @returns {Boolean} 日期是否跨年
   */
  const isCrossYear = (dates) => {
    // 获取第一个日期
    const firstDate = new Date(dates[0]);
    // 获取最后一个日期
    const lastDate = new Date(dates[dates.length - 1]);
    // 判断是否跨年
    return firstDate.getFullYear() !== lastDate.getFullYear();
  };

  /**
   * 判断日期合集中是否跨月
   * @param {Array} dates 日期合集
   * @returns {Boolean} 日期是否跨月
   */
  const isCrossMonth = (dates) => {
    // 获取第一个日期
    const firstDate = new Date(dates[0]);
    // 获取最后一个日期
    const lastDate = new Date(dates[dates.length - 1]);
    // 判断是否跨月
    return firstDate.getMonth() !== lastDate.getMonth();
  };

  /**
   * 判断日期是否间隔N天
   * @param {Array} dates 日期合集
   * @returns {String|false} 间隔天数（中文数字）或 false（如果日期不连续或不满足条件）
   */
  const isInterval = (dates) => {
    if (dates.length < 2) {
      return false;
    }
    // 获取第一个日期
    const firstDate = new Date(dates[0]);
    // 获取最后一个日期
    const secondDate = new Date(dates[1]);
    const daySecond = 24 * 60 * 60 * 1000;
    // 获取间隔天数
    const interval = (secondDate.getTime() - firstDate.getTime()) / daySecond;
    if (interval <= 1) {
      return false;
    }
    // 循环日期，校验间隔天数是否正确
    for (let i = 0; i < dates.length - 1; i++) {
      // 获取当前日期
      const currentDate = new Date(dates[i]);
      // 获取下一个日期
      const nextDate = new Date(dates[i + 1]);
      // 判断日期是否连续
      if (currentDate.getTime() + interval * daySecond !== nextDate.getTime()) {
        return false;
      }
    }
    // 排除0和1天
    const strList = [
      false,
      false,
      "两",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九",
      "十",
    ];
    // 返回间隔天数的中文表示，如果 interval 超出了中文数字的范围，返回 false
    return strList[interval] || false;
  };
  /**
   * 按年将数据分组
   * @param {Array} dates 日期合集
   * @returns {Array} 分离的数据合集
   * @example
   *  returns [ ['2023-09-01', '2023-09-02'],['2024-09-01']]
   */
  const groupDatesByYear = (dates) => {
    // 创建一个对象，用于存储按年份分组的日期
    const groupedDates = {};
    const groupedList = [];
    // 循环日期
    for (const date of dates) {
      // 获取日期的年份
      const year = new Date(date).getFullYear();
      // 如果对象中不存在该年份的数据，创建一个数组
      if (!groupedDates[year]) {
        groupedDates[year] = [];
      }
      // 将日期添加到对应年份的数组中
      groupedDates[year].push(date);
    }
    // 循环groupedDates
    for (const year in groupedDates) {
      groupedList.push(groupedDates[year]);
    }
    return groupedList;
  };
  /**
   * 按月将数据分组
   * @param {Array} dates 日期合集
   * @returns {Array} 分离的数据合集
   * @example
   * returns [ ['2023-09-01', '2023-09-02'],['2023-10-01']]
   */
  const groupDatesByMonth = (dates) => {
    // 创建一个对象，用于存储按年份分组的日期
    const groupedDates = {};
    const groupedList = [];
    // 循环日期
    for (const date of dates) {
      // 获取日期的年份
      const month = new Date(date).getMonth();
      // 如果对象中不存在该年份的数据，创建一个数组
      if (!groupedDates[month]) {
        groupedDates[month] = [];
      }
      // 将日期添加到对应年份的数组中
      groupedDates[month].push(date);
    }
    // 循环groupedDates
    for (const month in groupedDates) {
      groupedList.push(groupedDates[month]);
    }
    return groupedList;
  };

  // 日期转换方法
  const dateConvert = {
    // 输出日
    day: (time) => +time.split("-")[2],
    // 输出月日
    monthDay: (time) => `${+time.split("-")[1]}.${+time.split("-")[2]}`,
    // 输出年月日
    yearMonthDay: (time) =>
      `${time.split("-")[0]}.${+time.split("-")[1]}.${+time.split("-")[2]}`,
  };
  // 分割数组
  const dates = input.split(",");
  // 循环判断是否是正确的日期
  for (const date of dates) {
    if (!isValidDate(date)) {
      throw new Error(`Invalid date: ${date}`);
    }
  }
  // 排序
  dates.sort();
  // 是否跨年
  const crossYear = isCrossYear(dates);
  // 是否跨月
  const crossMonth = isCrossMonth(dates);

  // 是否间隔N天
  const interval = isInterval(dates);
  // 获取日期数据
  const getDay = dateConvert.day;
  const getMonth = dateConvert.monthDay;
  // 日期是否连续
  if (isContinuous(dates)) {
    if (crossYear) {
      return `${getMonth(dates[0])}-${getMonth(dates[dates.length - 1])}`;
    }
    if (crossMonth) {
      return `${getMonth(dates[0])}-${getMonth(dates[dates.length - 1])}`;
    }
    return `${getMonth(dates[0])}-${getMonth(dates[dates.length - 1])}`;
    // 规律的
  } else if (interval) {
    if (crossYear) {
      return `${getMonth(dates[0])}-${getMonth(
        dates[dates.length - 1]
      )} ${interval}天一次`;
    }
    if (crossMonth) {
      return `${getMonth(dates[0])}-${getDay(
        dates[dates.length - 1]
      )} ${interval}天一次`;
    }
    return `${getMonth(dates[0])}-${getDay(
      dates[dates.length - 1]
    )} ${interval}天一次`;
    // 小于5个的
  } else if (dates.length <= 5) {
    if (crossYear) {
      return groupDatesByYear(dates)
        .map((item) => {
          return `${getMonth(item[0])} ${item
            .filter((_, i) => i > 0)
            .map((k) => getDay(k))}`;
        })
        .join(" ");
    }
    if (crossMonth) {
      return groupDatesByMonth(dates)
        .map((item) => {
          return `${getMonth(item[0])} ${item
            .filter((_, i) => i > 0)
            .map((k) => getDay(k + " "))
            .join(" ")}`;
        })
        .join(" ");
    }
    return `${getMonth(dates[0])} ${dates
      .filter((_, i) => i > 0)
      .map((k) => getDay(k))
      .join(" ")}`;
  } else {
    return `${getMonth(dates[0])}-${getDay(dates[dates.length - 1])}`;
  }
};

// 测试用例
const runTests = () => {
  const testCases = [
    {
      title: "日期连续(不跨年)",
      input: "2023-09-01,2023-09-02,2023-09-03,2023-09-04,2023-09-05",
      expected: "9.1-9.5",
    },
    {
      title: "日期连续(跨年)",
      input: "2022-12-30,2022-12-31,2023-01-01,2023-01-02",
      expected: "12.30-1.2",
    },
    {
      title: "日期连续(跨月)",
      input: "2023-09-29,2023-09-30,2023-10-01",
      expected: "9.29-10.1",
    },
    {
      title: "日期不连续，且有规律",
      input: "2023-09-01,2023-09-03,2023-09-05,2023-09-07,2023-09-09",
      expected: "9.1-9 两天一次",
    },
    {
      title: "跨年 日期不连续，且有规律",
      input: "2022-12-30,2023-01-01,2023-01-03",
      expected: "12.30-1.3 两天一次",
    },
    {
      title: "日期不连续，且有规律",
      input: "2023-09-01,2023-09-04,2023-09-07,2023-09-10,2023-09-13",
      expected: "9.1-13 三天一次",
    },
    {
      title: "日期不连续，无规律(日期<=5个)",
      input: "2023-09-01,2023-09-03,2023-09-05,2023-09-08",
      expected: "9.1 3 5 8",
    },
    {
      input: "2022-12-30,2022-12-31,2023-01-01,2023-01-03",
      title: "日期不连续，跨年，无规律(日期<=5个)",
      expected: "12.30 31 1.1 3",
    },
    {
      input: "2023-12-30,2023-12-31,2023-01-01,2023-01-03",
      title: "日期不连续，跨月，无规律(日期<=5个)",
      expected: "1.1 3 12.30 31",
    },
    {
      title: "日期不连续，无规律(日期>5个)",
      input:
        "2023-09-01,2023-09-02,2023-09-04,2023-09-07,2023-09-09,2023-09-10,2023-09-13",
      expected: "9.1-13",
    },
  ];

  for (const testCase of testCases) {
    const { title, input, expected } = testCase;
    const result = findDatePattern(input);
    if (result !== expected) {
      console.error(
        `【未通过】 ${title}: '${input}' => Expect: '${expected}', Got: '${result}'`
      );
    } else {
      console.log(`【通过】${title}: '${input}' => '${result}'`);
    }
  }
};

runTests();
