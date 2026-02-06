const timelineData = {
  "1822": {
    title: "差分机",
    desc: "以齿轮自动计算多项式数表，让机械计算能够重复执行与纠错。",
  },
  "1936": {
    title: "图灵机",
    desc: "用纸带与读写头抽象计算过程，为算法与可计算性奠基。",
  },
  "1956": {
    title: "推理机",
    desc: "将规则推理转化为符号操作，开启人工智能的逻辑时代。",
  },
  "1970": {
    title: "专家系统",
    desc: "把专家知识编码成规则与诊断流程，适用于有限领域决策。",
  },
  "1957": {
    title: "感知机",
    desc: "线性加权求和并输出类别，是神经网络的原点之一。",
  },
  "1997": {
    title: "强化学习",
    desc: "智能体通过探索与奖励优化策略，擅长序列决策问题。",
  },
  "2012": {
    title: "深度学习",
    desc: "多层网络自动学习特征层级，推动感知任务突破。",
  },
  "2017": {
    title: "Transformer",
    desc: "自注意力机制并行建模序列关系，成为现代大模型核心。",
  },
};

const timelineItems = document.querySelectorAll(".timeline-item");
const timelineTitle = document.getElementById("timeline-title");
const timelineDesc = document.getElementById("timeline-desc");

if (timelineItems.length) {
  timelineItems.forEach((item) => {
    item.addEventListener("click", () => {
      timelineItems.forEach((btn) => btn.classList.remove("active"));
      item.classList.add("active");
      const data = timelineData[item.dataset.year];
      if (data) {
        timelineTitle.textContent = data.title;
        timelineDesc.textContent = data.desc;
      }
    });
  });
}

const differenceRange = document.querySelector("[data-mini='difference'] input");
const differenceOutput = document.querySelector("[data-mini='difference'] span");
const gears = document.querySelectorAll("[data-mini='difference'] .gear");

if (differenceRange && differenceOutput) {
  differenceRange.addEventListener("input", (event) => {
    const value = Number(event.target.value);
    differenceOutput.textContent = value;
    gears.forEach((gear, index) => {
      gear.style.animationDuration = `${3 - value * 0.1 + index * 0.3}s`;
    });
  });
}

const tape = document.querySelector(".turing-tape");
let headIndex = 3;
const tapeCells = [];

if (tape) {
  for (let i = 0; i < 8; i += 1) {
    const cell = document.createElement("div");
    cell.className = "turing-cell";
    cell.textContent = i % 2;
    tape.appendChild(cell);
    tapeCells.push(cell);
  }

  const updateHead = () => {
    tapeCells.forEach((cell, idx) => {
      cell.classList.toggle("active", idx === headIndex);
    });
  };

  updateHead();

  document.querySelectorAll(".turing-controls button").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "left") {
        headIndex = Math.max(0, headIndex - 1);
      }
      if (action === "right") {
        headIndex = Math.min(tapeCells.length - 1, headIndex + 1);
      }
      if (action === "flip") {
        tapeCells[headIndex].textContent = tapeCells[headIndex].textContent === "0" ? "1" : "0";
      }
      updateHead();
    });
  });
}

const inferenceButton = document.querySelector("[data-mini='inference'] .trigger");
if (inferenceButton) {
  inferenceButton.addEventListener("click", () => {
    const nodes = document.querySelectorAll("[data-mini='inference'] span");
    nodes.forEach((node, index) => {
      node.classList.remove("active");
      setTimeout(() => node.classList.add("active"), 150 * index);
    });
  });
}

const expertSelect = document.querySelector("[data-mini='expert'] select");
const expertOutput = document.querySelector("[data-mini='expert'] span");

if (expertSelect && expertOutput) {
  expertSelect.addEventListener("change", (event) => {
    const value = event.target.value;
    const mapping = {
      slow: "检查网络与缓存设置",
      noise: "更新滤波与传感器参数",
      overheat: "降低负载并检查散热",
      none: "等待输入",
    };
    expertOutput.textContent = mapping[value] || "等待输入";
  });
}

const perceptronRange = document.querySelector("[data-mini='perceptron'] input");
const divider = document.querySelector(".perceptron-plot .divider");
if (perceptronRange && divider) {
  perceptronRange.addEventListener("input", (event) => {
    divider.style.transform = `rotate(${event.target.value}deg)`;
  });
}

const sampleGrid = document.querySelector(".sample-grid");
const supervisedOutput = document.querySelector("[data-mini='supervised'] span");

if (sampleGrid && supervisedOutput) {
  const labels = ["A", "A", "B", "A", "B", "B", "A", "B"];
  labels.forEach((label, index) => {
    const sample = document.createElement("div");
    sample.className = "sample";
    sample.dataset.label = label;
    sample.textContent = `样本 ${index + 1}`;
    sample.addEventListener("click", () => {
      supervisedOutput.textContent = label === "A" ? "归为类别 A" : "归为类别 B";
    });
    sampleGrid.appendChild(sample);
  });
}

const clusterRange = document.querySelector("[data-mini='unsupervised'] input");
const clusterField = document.querySelector(".cluster-field");
if (clusterRange && clusterField) {
  const updateCluster = () => {
    const scale = Number(clusterRange.value) / 100 + 0.3;
    clusterField.style.setProperty("--cluster-scale", scale);
  };

  clusterRange.addEventListener("input", updateCluster);
  updateCluster();
}

const exploreButton = document.querySelector("[data-mini='rl'] .explore");
const agent = document.querySelector(".rl-track .agent");
const rewardOutput = document.querySelector("[data-mini='rl'] span");
let reward = 0;

if (exploreButton && agent && rewardOutput) {
  exploreButton.addEventListener("click", () => {
    const position = Math.random() * 70 + 10;
    agent.style.left = `${position}%`;
    reward += position > 60 ? 5 : 1;
    rewardOutput.textContent = reward;
  });
}

const deepButtons = document.querySelectorAll(".deep-buttons button");
const deepLayers = document.querySelectorAll(".deep-layers span");
const deepProfiles = {
  image: ["90%", "70%", "40%"],
  audio: ["70%", "60%", "55%"],
  text: ["60%", "75%", "65%"],
};

if (deepButtons.length && deepLayers.length) {
  const setProfile = (key) => {
    deepLayers.forEach((layer, index) => {
      layer.style.width = deepProfiles[key][index];
    });
  };

  deepButtons.forEach((button) => {
    button.addEventListener("click", () => {
      deepButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      setProfile(button.dataset.input);
    });
  });

  setProfile("image");
}

const tokenRow = document.querySelector(".token-row");
const attentionBars = document.querySelector(".attention-bars");

if (tokenRow && attentionBars) {
  const tokens = Array.from(tokenRow.querySelectorAll("button"));
  tokens.forEach((token) => {
    const bar = document.createElement("div");
    bar.className = "attention-bar";
    const inner = document.createElement("span");
    bar.appendChild(inner);
    attentionBars.appendChild(bar);
  });

  tokenRow.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") return;
    const activeIndex = tokens.indexOf(event.target);
    attentionBars.querySelectorAll("span").forEach((span, index) => {
      const distance = Math.abs(index - activeIndex);
      const width = Math.max(20, 100 - distance * 20);
      span.style.width = `${width}%`;
    });
  });
}

const scrollButtons = document.querySelectorAll("[data-scroll]");
scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scroll);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
