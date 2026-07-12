"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";

const SCRIPT_INFO = {
  name: "《天机匣》第1集：雨夜惊变",
  type: "古风武侠 / 奇幻冒险",
  wordCount: "3,200 字",
  author: "文演 AI",
  createdAt: "2026-07-08",
};

type AssetItem = {
  image: string;
  realImage?: string;
  name: string;
  role?: string;
  subType?: string;
  desc: string;
  duration?: string;
  appearances?: string[];
  creation?: { label: string; value: string }[];
  project?: string;
  shots?: { image: string; name: string; desc: string; duration: string }[];
  metrics?: { label: string; value: string; unit?: string }[];
  badge?: string;
  tags?: string[];
  detailList?: { title: string; type: "text" | "avatar"; items: { name: string; sub?: string; image?: string }[] }[];
};

type SubCategory = {
  key: string;
  label: string;
  desc: string;
  icon: string;
  count: number;
  stats: { label: string; value: string }[];
  thumbnails: string[];
  assetType: "image" | "video" | "audio" | "data" | "digital-human" | "studio" | "billing";
  items?: { name: string; desc: string; tag: string; color: string }[];
  assetItems?: AssetItem[];
};

type AssetLayer = {
  key: string;
  level: number;
  title: string;
  slogan: string;
  subs: SubCategory[];
};

const LAYERS: AssetLayer[] = [
  {
    key: "L1",
    level: 1,
    title: "创作素材资产",
    slogan: "直接复用，降低重复成本",
    subs: [
      {
        key: "character",
        label: "角色资产库",
        desc: "剧本解析提取的角色形象",
        icon: "🎭",
        count: 7,
        stats: [
          { label: "调用次数", value: "18 次" },
          { label: "最高出镜", value: "阿离" },
        ],
        thumbnails: [
          "/人物/1_阿离_30515.png",
          "/人物/2_老周头_30516.png",
          "/人物/5_黑袍人_30519.png",
          "/人物/7_师父_30521.png",
        ],
        assetType: "image",
        assetItems: [
          {
            image: "/人物/1_阿离_30515.png",
            name: "阿离",
            role: "女主角",
            desc: "天机匣守护者，背负家族秘密的少女。外表清冷寡言，内心善良坚韧，身手矫捷，擅长短剑术。",
            appearances: ["分镜01-雨夜遇袈", "分镜03-客栈对决", "分镜05-竹林追踪", "分镜08-天机匣启灵", "分镜10-真相揭露"],
            creation: [
              { label: "生成模型", value: "Flux-Pro 1.1" },
              { label: "提示词风格", value: "古风武侠少女，清冷气质" },
              { label: "生成时间", value: "2026-07-08 14:23" },
              { label: "迭代次数", value: "第3版" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/人物/2_老周头_30516.png",
            name: "老周头",
            role: "配角",
            desc: "顺风客栈老板，表面和善的生意人，实为江湖老手，知晓许多江湖秘闻。",
            appearances: ["分镜02-客栈报信", "分镜04-大堂指路", "分镜07-后院告警"],
            creation: [
              { label: "生成模型", value: "Flux-Pro 1.1" },
              { label: "提示词风格", value: "古风武侠老者，慈眉善目" },
              { label: "生成时间", value: "2026-07-08 14:31" },
              { label: "迭代次数", value: "第2版" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/人物/3_柳大娘_30517.png",
            name: "柳大娘",
            role: "配角",
            desc: "客栈厨娘，热心肠的邻家大嫂形象，关键时刻为阿离提供帮助。",
            appearances: ["分镜04-大堂送饭", "分镜06-厨房密语"],
            creation: [
              { label: "生成模型", value: "Flux-Pro 1.1" },
              { label: "提示词风格", value: "古风中年妇女，朴实热忱" },
              { label: "生成时间", value: "2026-07-08 14:35" },
              { label: "迭代次数", value: "第1版" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/人物/4_小豆子_30518.png",
            name: "小豆子",
            role: "配角",
            desc: "客栈小燮计，机灵鬼怪的小男孩，梦想闯荡江湖，崇拜阿离的身手。",
            appearances: ["分镜03-客栈引路", "分镜09-报信奔跑"],
            creation: [
              { label: "生成模型", value: "Flux-Pro 1.1" },
              { label: "提示词风格", value: "古风少年，活泼机灵" },
              { label: "生成时间", value: "2026-07-08 14:38" },
              { label: "迭代次数", value: "第1版" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/人物/5_黑袍人_30519.png",
            name: "黑袍人",
            role: "反派",
            desc: "神秘组织杀手，全程黑袍遮面，身法诡谎。真实身份与天机匣有深层关联。",
            appearances: ["分镜01-雨夜袭击", "分镜05-竹林对峙", "分镜08-暗处窥伺", "分镜10-身份揭露"],
            creation: [
              { label: "生成模型", value: "Flux-Pro 1.1" },
              { label: "提示词风格", value: "古风武侠反派，黑袍神秘人" },
              { label: "生成时间", value: "2026-07-08 14:42" },
              { label: "迭代次数", value: "第4版" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/人物/6_黑袍人(摘下面具形态（与阿离相似、脸颊旧疤）)_30520.png",
            name: "黑袍人(摘面)",
            role: "反派",
            desc: "黑袍人摘下面具后的形态，与阿离面容相似，脸颊有旧疤。暗示身世与阿离有深层关联。",
            appearances: ["分镜10-身份揭露"],
            creation: [
              { label: "生成模型", value: "Flux-Pro 1.1" },
              { label: "提示词风格", value: "古风武侠，相似面容+旧疤" },
              { label: "生成时间", value: "2026-07-08 14:45" },
              { label: "迭代次数", value: "第2版" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/人物/7_师父_30521.png",
            name: "师父",
            role: "重要配角",
            desc: "阿离的师父，隐居江湖的高人。在天机匣幻境中出现，指引阿离揭开身世之谜。",
            appearances: ["分镜08-天机匣幻境指引"],
            creation: [
              { label: "生成模型", value: "Flux-Pro 1.1" },
              { label: "提示词风格", value: "古风武侠高人，仙风道骨" },
              { label: "生成时间", value: "2026-07-08 14:50" },
              { label: "迭代次数", value: "第2版" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
        ],
      },
      {
        key: "scene",
        label: "场景素材库",
        desc: "场景、道具、背景",
        icon: "🏞",
        count: 19,
        stats: [
          { label: "场景数", value: "8 场" },
          { label: "道具数", value: "11 件" },
        ],
        thumbnails: [
          "/场景/天机匣_场景资产_天机匣幻境金色空间_外景(全景)_30525.png",
          "/场景/天机匣_场景资产_顺风客栈·大堂_内景(全景)_30534.png",
          "/道具/天机匣_道具资产_短剑_30553.png",
          "/道具/天机匣_道具资产_木匣(开启发光)_30550.png",
        ],
        assetType: "image",
        assetItems: [
          // 场景
          {
            image: "/场景/天机匣_场景资产_天机匣幻境金色空间_外景(全景)_30525.png",
            name: "天机匣幻境·金色空间",
            subType: "场景",
            desc: "天机匣启灵后的幻境空间，金色光芒充盈，云雾缭绕。阿离在此与师父的灵魂对话，揭开身世之谜。",
            appearances: ["分镜08-天机匣启灵"],
            creation: [
              { label: "生成模型", value: "即梦3.0" },
              { label: "提示词风格", value: "金色幻境空间，云雾光线" },
              { label: "生成时间", value: "2026-07-08 15:02" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/场景/天机匣_场景资产_顺风客栈·大堂_内景(全景)_30534.png",
            name: "顺风客栈·大堂",
            subType: "场景",
            desc: "客栈核心场景，八仙桌、柜台账台分布其间。夜间火光照建映照江湖氛围。多场重头戏在此发生。",
            appearances: ["分镜03-客栈对决", "分镜04-大堂指路", "分镜07-后院告警"],
            creation: [
              { label: "生成模型", value: "即梦3.0" },
              { label: "提示词风格", value: "古风客栈内景，木构建筑" },
              { label: "生成时间", value: "2026-07-08 15:05" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/场景/天机匣_场景资产_客栈后山竹林小径_外景(全景)_30528.png",
            name: "客栈后山·竹林小径",
            subType: "场景",
            desc: "客栈后方竹林小径，夜雨中阿离与黑袍人展开追逐与对峙的关键外景场景。",
            appearances: ["分镜05-竹林追踪"],
            creation: [
              { label: "生成模型", value: "即梦3.0" },
              { label: "提示词风格", value: "夜雨竹林小径，幽暗氛围" },
              { label: "生成时间", value: "2026-07-08 15:08" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/场景/天机匣_场景资产_江南古道驿道_外景(全景)_30531.png",
            name: "江南古道·驿道",
            subType: "场景",
            desc: "青石板驿道全景，黄昏雨景。开场与结尾交代路线的重要外景。",
            appearances: ["分镜01-雨夜遇袈", "分镜10-真相揭露"],
            creation: [
              { label: "生成模型", value: "即梦3.0" },
              { label: "提示词风格", value: "江南古道黄昏雨景" },
              { label: "生成时间", value: "2026-07-08 15:11" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/场景/天机匣_场景资产_顺风客栈·二楼客房_内景(全景)_30538.png",
            name: "顺风客栈·二楼客房",
            subType: "场景",
            desc: "客房全景，方桌、木窗、油灯。阿离查看木匣的重要场景。",
            appearances: ["分镜02-客栈报信", "分镜06-厨房密语"],
            creation: [
              { label: "生成模型", value: "即梦3.0" },
              { label: "提示词风格", value: "古风客栈客房内景" },
              { label: "生成时间", value: "2026-07-08 15:14" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/场景/天机匣_场景资产_顺风客栈·后院_外景(全景)_30541.png",
            name: "顺风客栈·后院",
            subType: "场景",
            desc: "客栈后院全景，柴房、磨盘散布。老周头在此告警阿离。",
            appearances: ["分镜07-后院告警"],
            creation: [
              { label: "生成模型", value: "即梦3.0" },
              { label: "提示词风格", value: "古风后院外景，夜雨" },
              { label: "生成时间", value: "2026-07-08 15:17" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          // 道具
          {
            image: "/道具/天机匣_道具资产_木匣(开启发光)_30550.png",
            name: "天机匣",
            subType: "道具",
            desc: "全剧核心道具，开启后散发金色光芒。内藏家族秘密与天机图谱。",
            appearances: ["分镜01-雨夜遇袈", "分镜08-天机匣启灵", "分镜10-真相揭露"],
            creation: [
              { label: "生成模型", value: "即梦3.0" },
              { label: "提示词风格", value: "古风木匣开启发光特效" },
              { label: "生成时间", value: "2026-07-08 15:20" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/道具/天机匣_道具资产_短剑_30553.png",
            name: "短剑",
            subType: "道具",
            desc: "阿离随身佩剑，精密锋利，剑身刻有古纹。多次在战斗场景中使用。",
            appearances: ["分镜01-雨夜遇袈", "分镜03-客栈对决", "分镜05-竹林追踪"],
            creation: [
              { label: "生成模型", value: "即梦3.0" },
              { label: "提示词风格", value: "古风短剑，剑身古纹" },
              { label: "生成时间", value: "2026-07-08 15:23" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/道具/天机匣_道具资产_青铜面具_30557.png",
            name: "青铜面具",
            subType: "道具",
            desc: "黑袍人的标志性面具，造型诡异。摘下面具后揭示黑袍人与阿离的身世关联。",
            appearances: ["分镜01-雨夜遇袈", "分镜10-身份揭露"],
            creation: [
              { label: "生成模型", value: "即梦3.0" },
              { label: "提示词风格", value: "青铜面具，诡异造型" },
              { label: "生成时间", value: "2026-07-08 15:26" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/道具/天机匣_道具资产_透骨钉_30555.png",
            name: "透骨钉",
            subType: "道具",
            desc: "黑袍人使用的暗器，细长金属钉。在竹林追逐场景中使用。",
            appearances: ["分镜05-竹林追踪"],
            creation: [
              { label: "生成模型", value: "即梦3.0" },
              { label: "提示词风格", value: "暗器透骨钉，金属质感" },
              { label: "生成时间", value: "2026-07-08 15:29" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/道具/天机匣_道具资产_铜锣_30547.png",
            name: "铜锣",
            subType: "道具",
            desc: "客栈报警用具，老周头发现黑袍人后在后院敲响铜锣告警。",
            appearances: ["分镜07-后院告警"],
            creation: [
              { label: "生成模型", value: "即梦3.0" },
              { label: "提示词风格", value: "古风铜锣" },
              { label: "生成时间", value: "2026-07-08 15:32" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/道具/天机匣_道具资产_荷包_30552.png",
            name: "荷包",
            subType: "道具",
            desc: "阿离随身携带的荷包，内藏关键线索物品。",
            appearances: ["分镜02-客栈报信"],
            creation: [
              { label: "生成模型", value: "即梦3.0" },
              { label: "提示词风格", value: "古风绣花荷包" },
              { label: "生成时间", value: "2026-07-08 15:35" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          // 背景
          {
            image: "/场景/天机匣_场景资产_天机匣幻境金色空间_外景(云端近距对话区_夜)_30526.png",
            name: "幻境·云端对话区",
            subType: "背景",
            desc: "天机匣幻境内云端近距对话区，阿离与师父灵魂对话的背景画面。",
            appearances: ["分镜08-天机匣启灵"],
            creation: [
              { label: "生成模型", value: "即梦3.0" },
              { label: "提示词风格", value: "幻境云端背景，金色光影" },
              { label: "生成时间", value: "2026-07-08 15:38" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/场景/天机匣_场景资产_客栈后山竹林小径_外景(竹林小径对峙区_夜雨)_30529.png",
            name: "竹林·对峙区背景",
            subType: "背景",
            desc: "竹林小径上的对峙区域，夜雨氛围。阿离与黑袍人首次正面交锋的背景画面。",
            appearances: ["分镜05-竹林追踪"],
            creation: [
              { label: "生成模型", value: "即梦3.0" },
              { label: "提示词风格", value: "夜雨竹林对峙背景" },
              { label: "生成时间", value: "2026-07-08 15:41" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/场景/天机匣_场景资产_顺风客栈·大堂_内景(中央八仙桌通行区_夜雨)_30535.png",
            name: "客栈大堂·八仙桌区",
            subType: "背景",
            desc: "大堂中央八仙桌区域背景，夜雨火光交错，客栈内核心对话背景。",
            appearances: ["分镜03-客栈对决", "分镜04-大堂指路"],
            creation: [
              { label: "生成模型", value: "即梦3.0" },
              { label: "提示词风格", value: "客栈大堂八仙桌区背景" },
              { label: "生成时间", value: "2026-07-08 15:44" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "/场景/天机匣_场景资产_江南古道驿道_外景(青石板驿道行走区_黄昏雨)_30532.png",
            name: "驿道·行走区背景",
            subType: "背景",
            desc: "青石板驿道行走区背景，黄昏雨景。开场阿离独自行走的背景画面。",
            appearances: ["分镜01-雨夜遇袈"],
            creation: [
              { label: "生成模型", value: "即梦3.0" },
              { label: "提示词风格", value: "黄昏驿道行走背景" },
              { label: "生成时间", value: "2026-07-08 15:47" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
        ],
      },
      {
        key: "dubbing",
        label: "配音音效库",
        desc: "AI配音音色、BGM、音效",
        icon: "🎵",
        count: 36,
        stats: [
          { label: "AI音色", value: "15 个" },
          { label: "BGM", value: "12 首" },
        ],
        thumbnails: [],
        assetType: "audio",
        assetItems: [
          // AI音色
          {
            image: "",
            name: "阿离·少御音",
            subType: "AI音色",
            desc: "清冷女声，适合古风少女角色。声线清澈透亮，带有淡淡的忧郁感。",
            duration: "0:32",
            creation: [
              { label: "音色模型", value: "CosyVoice v2" },
              { label: "参考音色", value: "古风少女音库" },
              { label: "采样率", value: "48kHz" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "",
            name: "老周头·沧桑音",
            subType: "AI音色",
            desc: "浑厚男声，适合老年男性角色。声音沉稳有力，带有岁月沧桑感。",
            duration: "0:28",
            creation: [
              { label: "音色模型", value: "CosyVoice v2" },
              { label: "参考音色", value: "老年沧桑男声库" },
              { label: "采样率", value: "48kHz" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "",
            name: "黑袍人·阴嗓",
            subType: "AI音色",
            desc: "低沉阴冷，适合反派角色。声线压抑沉透，充满威胁感。",
            duration: "0:25",
            creation: [
              { label: "音色模型", value: "CosyVoice v2" },
              { label: "参考音色", value: "阴冷反派男声库" },
              { label: "采样率", value: "48kHz" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "",
            name: "柳大娘·温暖音",
            subType: "AI音色",
            desc: "温柔慈祥女声，适合中年女性角色。声线温暖柔和，有亲切感。",
            duration: "0:20",
            creation: [
              { label: "音色模型", value: "CosyVoice v2" },
              { label: "参考音色", value: "中年温暖女声库" },
              { label: "采样率", value: "48kHz" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "",
            name: "小豆子·清脆童音",
            subType: "AI音色",
            desc: "活泼清脆的童声，适合少年角色。声音明亮充满朝气。",
            duration: "0:18",
            creation: [
              { label: "音色模型", value: "CosyVoice v2" },
              { label: "参考音色", value: "少年清脆童声库" },
              { label: "采样率", value: "48kHz" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "",
            name: "师父·空灵音",
            subType: "AI音色",
            desc: "空灵深远的老者声音，适合高人/幻境中的灵魂对话。声线飘逸缥纱。",
            duration: "0:35",
            creation: [
              { label: "音色模型", value: "CosyVoice v2" },
              { label: "参考音色", value: "空灵老者音库" },
              { label: "采样率", value: "48kHz" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          // BGM
          {
            image: "",
            name: "雨夜惊变",
            subType: "BGM",
            desc: "紧张棗疑背景音乐，二胡+古筝，用于开场雨夜场景。",
            duration: "2:15",
            creation: [
              { label: "生成模型", value: "Suno v4" },
              { label: "提示词", value: "古风悬疑BGM，二胡古筝" },
              { label: "BPM", value: "72" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "",
            name: "客栈对决",
            subType: "BGM",
            desc: "快节奏武侠战斗配乐，笛子+鼓点，用于客栈战斗场景。",
            duration: "1:48",
            creation: [
              { label: "生成模型", value: "Suno v4" },
              { label: "提示词", value: "武侠战斗BGM，笛子鼓点" },
              { label: "BPM", value: "128" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "",
            name: "幻境启示",
            subType: "BGM",
            desc: "空灵幻境背景音乐，竖琴+瞟，用于天机匣启灵场景。",
            duration: "3:02",
            creation: [
              { label: "生成模型", value: "Suno v4" },
              { label: "提示词", value: "幻境空灵BGM，竖琴瞟" },
              { label: "BPM", value: "60" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "",
            name: "竹林追踪",
            subType: "BGM",
            desc: "紧张追逐背景音乐，古琴+鼓，用于竹林追踪场景。",
            duration: "1:30",
            creation: [
              { label: "生成模型", value: "Suno v4" },
              { label: "提示词", value: "追逐紧张BGM，古琴鼓" },
              { label: "BPM", value: "110" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "",
            name: "真相揭露",
            subType: "BGM",
            desc: "情感决堤背景音乐，箫+弦乐，用于结局真相揭露场景。",
            duration: "2:40",
            creation: [
              { label: "生成模型", value: "Suno v4" },
              { label: "提示词", value: "情感高潮BGM，箫弦乐" },
              { label: "BPM", value: "68" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          // 音效
          {
            image: "",
            name: "雷雨环境音",
            subType: "音效",
            desc: "雷声、雨声、风声组合环境音，用于雨夜外景场景。",
            duration: "0:45",
            creation: [
              { label: "素材来源", value: "AudioGen" },
              { label: "类型", value: "环境音·雷雨" },
              { label: "声道", value: "立体声" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "",
            name: "刀剑碰撞",
            subType: "音效",
            desc: "金属碰撞、挥舞破空音效，用于战斗场景。",
            duration: "0:08",
            creation: [
              { label: "素材来源", value: "AudioGen" },
              { label: "类型", value: "动作音·刀剑" },
              { label: "声道", value: "立体声" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "",
            name: "心跳加速",
            subType: "音效",
            desc: "悬疑场景心跳加速音效，用于紧张棗疑时刻。",
            duration: "0:12",
            creation: [
              { label: "素材来源", value: "AudioGen" },
              { label: "类型", value: "氛围音·心跳" },
              { label: "声道", value: "立体声" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "",
            name: "木匣开启",
            subType: "音效",
            desc: "古旧木匣开启嘎吱声+金属咔哒声，用于天机匣启灵场景。",
            duration: "0:06",
            creation: [
              { label: "素材来源", value: "AudioGen" },
              { label: "类型", value: "物件音·木匣" },
              { label: "声道", value: "立体声" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "",
            name: "脚步声·竹林",
            subType: "音效",
            desc: "竹林中奔跑脚步声，踩踏落叶与泥地的细节音效。",
            duration: "0:15",
            creation: [
              { label: "素材来源", value: "AudioGen" },
              { label: "类型", value: "动作音·脚步" },
              { label: "声道", value: "立体声" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
          {
            image: "",
            name: "客栈杯碟碰撞",
            subType: "音效",
            desc: "客栈内的杯碟碰撞、说话嘈杂环境音效。",
            duration: "0:20",
            creation: [
              { label: "素材来源", value: "AudioGen" },
              { label: "类型", value: "环境音·客栈" },
              { label: "声道", value: "立体声" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
          },
        ],
      },
      {
        key: "storyboard-template",
        label: "分镜模板库",
        desc: "按题材分类的标准化分镜",
        icon: "🎬",
        count: 12,
        stats: [
          { label: "总时长", value: "52s" },
          { label: "题材", value: "武侠/悬疑" },
        ],
        thumbnails: [
          "/场景/天机匣_场景资产_顺风客栈·大堂_内景(全景)_30534.png",
          "/场景/天机匣_场景资产_客栈后山竹林小径_外景(竹林小径对峙区_夜雨)_30529.png",
          "/场景/天机匣_场景资产_顺风客栈·二楼客房_内景(方桌木匣查看区_夜雨)_30539.png",
          "/场景/天机匣_场景资产_江南古道驿道_外景(青石板驿道行走区_黄昏雨)_30532.png",
        ],
        assetType: "video",
        assetItems: [
          {
            image: "/场景/天机匣_场景资产_江南古道驿道_外景(青石板驿道行走区_黄昏雨)_30532.png",
            name: "雨夜惊变·开场",
            subType: "开场模板",
            desc: "全景→特写渐进式镜头，青石板驿道黄昏雨景。从远景环境推进至人物特写，营造悬疑开场氛围。",
            duration: "0:08",
            appearances: ["分镜01-雨夜遇袨"],
            creation: [
              { label: "镜头数", value: "3 个" },
              { label: "运镜方式", value: "推进+摇摄" },
              { label: "生成时间", value: "2026-07-08 16:02" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
            shots: [
              { image: "/场景/天机匣_场景资产_江南古道驿道_外景(全景)_30531.png", name: "分镜01-A · 驿道全景", desc: "远景交代环境，黄昏雨中的江南古道", duration: "0:03" },
              { image: "/场景/天机匣_场景资产_江南古道驿道_外景(青石板驿道行走区_黄昏雨)_30532.png", name: "分镜01-B · 人物中景", desc: "中景跟拍阿离独行的身影", duration: "0:03" },
              { image: "/道具/天机匣_道具资产_木匣(开启发光)_30550.png", name: "分镜01-C · 木匣特写", desc: "特写阿离手中的木匣微微发光", duration: "0:02" },
            ],
          },
          {
            image: "/场景/天机匣_场景资产_顺风客栈·二楼客房_内景(方桌木匣查看区_夜雨)_30539.png",
            name: "客栈密语·对话",
            subType: "对话模板",
            desc: "正反打镜头模板，适合双人对话场景。客房内油灯旁的密谈，景别切换流畅。",
            duration: "0:06",
            appearances: ["分镜02-客栈报信", "分镜06-厨房密语"],
            creation: [
              { label: "镜头数", value: "4 个" },
              { label: "运镜方式", value: "正反打" },
              { label: "生成时间", value: "2026-07-08 16:05" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
            shots: [
              { image: "/场景/天机匣_场景资产_顺风客栈·二楼客房_内景(全景)_30538.png", name: "分镜02-A · 客房全景", desc: "双人同框全景交代空间关系", duration: "0:02" },
              { image: "/场景/天机匣_场景资产_顺风客栈·二楼客房_内景(方桌木匣查看区_夜雨)_30539.png", name: "分镜02-B · 阿离正打", desc: "阿离正面中景，表情凝重", duration: "0:02" },
              { image: "/场景/天机匣_场景资产_顺风客栈·大堂_内景(中央八仙桌通行区_夜雨)_30535.png", name: "分镜02-C · 老周头反打", desc: "老周头回应，低声密语", duration: "0:02" },
            ],
          },
          {
            image: "/场景/天机匣_场景资产_客栈后山竹林小径_外景(竹林小径对峙区_夜雨)_30529.png",
            name: "竹林追踪·动作",
            subType: "动作模板",
            desc: "快切+跟镜头模板，适合打斗追逐。竹林夜雨中的高速运动镜头，动感十足。",
            duration: "0:10",
            appearances: ["分镜05-竹林追踪"],
            creation: [
              { label: "镜头数", value: "5 个" },
              { label: "运镜方式", value: "跟拍+快切" },
              { label: "生成时间", value: "2026-07-08 16:08" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
            shots: [
              { image: "/场景/天机匣_场景资产_客栈后山竹林小径_外景(全景)_30528.png", name: "分镜05-A · 竹林全景", desc: "俯拍竹林全景，二人追逐入场", duration: "0:02" },
              { image: "/场景/天机匣_场景资产_客栈后山竹林小径_外景(竹林小径对峙区_夜雨)_30529.png", name: "分镜05-B · 追踪中景", desc: "跟拍阿离穿越竹林", duration: "0:03" },
              { image: "/道具/天机匣_道具资产_短剑_30553.png", name: "分镜05-C · 短剑特写", desc: "短剑出鞘快切特写", duration: "0:02" },
              { image: "/道具/天机匣_道具资产_透骨钉_30555.png", name: "分镜05-D · 暗器特写", desc: "透骨钉破空飞行特写", duration: "0:02" },
              { image: "/场景/天机匣_场景资产_客栈后山竹林小径_外景(竹林小径对峙区_夜雨)_30529.png", name: "分镜05-E · 对峙全景", desc: "二人对峙全景收尾", duration: "0:01" },
            ],
          },
          {
            image: "/场景/天机匣_场景资产_天机匣幻境金色空间_外景(云端近距对话区_夜)_30526.png",
            name: "幻境启示·转场",
            subType: "转场模板",
            desc: "慢镜头+黑场转场，营造悬念。金色幻境空间的梦幻过渡效果。",
            duration: "0:05",
            appearances: ["分镜08-天机匣启灵"],
            creation: [
              { label: "镜头数", value: "2 个" },
              { label: "运镜方式", value: "慢镜+黑场" },
              { label: "生成时间", value: "2026-07-08 16:11" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
            shots: [
              { image: "/场景/天机匣_场景资产_天机匣幻境金色空间_外景(全景)_30525.png", name: "分镜08-A · 幻境全景", desc: "金色幻境空间慢镜展现", duration: "0:03" },
              { image: "/场景/天机匣_场景资产_天机匣幻境金色空间_外景(云端近距对话区_夜)_30526.png", name: "分镜08-B · 云端对话", desc: "云端近距对话区慢入黑场", duration: "0:02" },
            ],
          },
          {
            image: "/场景/天机匣_场景资产_顺风客栈·后院_外景(全景)_30541.png",
            name: "后院告警·空镜",
            subType: "空镜模板",
            desc: "环境空镜过渡镜头模板。后院夜雨全景，营造紧张寂静氛围。",
            duration: "0:04",
            appearances: ["分镜07-后院告警"],
            creation: [
              { label: "镜头数", value: "1 个" },
              { label: "运镜方式", value: "固定全景" },
              { label: "生成时间", value: "2026-07-08 16:14" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
            shots: [
              { image: "/场景/天机匣_场景资产_顺风客栈·后院_外景(全景)_30541.png", name: "分镜07 · 后院空镜", desc: "后院夜雨全景固定镜头", duration: "0:04" },
            ],
          },
          {
            image: "/场景/天机匣_场景资产_顺风客栈·大堂_内景(中央八仙桌通行区_夜雨)_30535.png",
            name: "客栈对决·出场",
            subType: "出场模板",
            desc: "从脚到头的渐进式展示模板。黑袍人踏入客栈大堂的压迫感出场镜头。",
            duration: "0:07",
            appearances: ["分镜03-客栈对决"],
            creation: [
              { label: "镜头数", value: "3 个" },
              { label: "运镜方式", value: "由下至上摇摄" },
              { label: "生成时间", value: "2026-07-08 16:17" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
            shots: [
              { image: "/场景/天机匣_场景资产_顺风客栈·大堂_内景(全景)_30534.png", name: "分镜03-A · 大堂全景", desc: "黑袍人踏入大堂全景", duration: "0:02" },
              { image: "/场景/天机匣_场景资产_顺风客栈·大堂_内景(中央八仙桌通行区_夜雨)_30535.png", name: "分镜03-B · 脚部特写", desc: "由下至上摇摄黑袍人脚步", duration: "0:03" },
              { image: "/道具/天机匣_道具资产_青铜面具_30557.png", name: "分镜03-C · 面具特写", desc: "青铜面具面部特写收尾", duration: "0:02" },
            ],
          },
          {
            image: "/场景/天机匣_场景资产_江南古道驿道_外景(全景)_30531.png",
            name: "古道独行·空镜",
            subType: "空镜模板",
            desc: "江南古道自然风光展示镜头模板。黄昏雨中的驿道全景，适合场景交代。",
            duration: "0:05",
            appearances: ["分镜01-雨夜遇袨"],
            creation: [
              { label: "镜头数", value: "1 个" },
              { label: "运镜方式", value: "固定全景" },
              { label: "生成时间", value: "2026-07-08 16:20" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
            shots: [
              { image: "/场景/天机匣_场景资产_江南古道驿道_外景(全景)_30531.png", name: "分镜01 · 古道空镜", desc: "黄昏雨中驿道全景固定镜头", duration: "0:05" },
            ],
          },
          {
            image: "/场景/天机匣_场景资产_客栈后山竹林小径_外景(全景)_30528.png",
            name: "竹林对峙·动作",
            subType: "动作模板",
            desc: "对峙+交锋组合镜头模板。竹林全景中的二人对峙，快慢结合营造张力。",
            duration: "0:09",
            appearances: ["分镜05-竹林追踪"],
            creation: [
              { label: "镜头数", value: "4 个" },
              { label: "运镜方式", value: "环绕+推进" },
              { label: "生成时间", value: "2026-07-08 16:23" },
            ],
            project: "天机匣·短剧创作 / 《天机匣》第1集",
            shots: [
              { image: "/场景/天机匣_场景资产_客栈后山竹林小径_外景(全景)_30528.png", name: "分镜05-A · 竹林全景", desc: "环绕拍摄竹林二人对峙", duration: "0:03" },
              { image: "/道具/天机匣_道具资产_短剑_30553.png", name: "分镜05-B · 剑拔弩张", desc: "短剑横亘特写快切", duration: "0:02" },
              { image: "/场景/天机匣_场景资产_客栈后山竹林小径_外景(竹林小径对峙区_夜雨)_30529.png", name: "分镜05-C · 交锋中景", desc: "二人交锋中景推进镜头", duration: "0:02" },
              { image: "/道具/天机匣_道具资产_青铜面具_30557.png", name: "分镜05-D · 面具特写", desc: "黑袍人面具特写收尾", duration: "0:02" },
            ],
          },
        ],
      },
      {
        key: "local-culture",
        label: "本土文化元素资产库",
        desc: "赣鄱文化、红色文化、江西方言",
        icon: "🏛",
        count: 6,
        stats: [
          { label: "文化类型", value: "3 类" },
          { label: "元素数", value: "6 项" },
        ],
        thumbnails: [
          "/本土文化/采茶戏.jpg",
          "/本土文化/景德镇陶瓷.png",
        ],
        assetType: "image",
        assetItems: [
          // 赣剧艺术
          {
            image: "/本土文化/采茶戏.jpg",
            name: "赣剧脸谱·关公红面",
            subType: "赣剧艺术",
            desc: "江西赣剧经典关公红色脸谱，忠义象征。红色为主调，黑色勾画眉眼，可用于角色妆容设计。",
            creation: [
              { label: "元素类型", value: "脸谱妆容" },
              { label: "文化来源", value: "江西赣剧院" },
              { label: "适用场景", value: "角色妆容/道具设计" },
            ],
            project: "天机匣·短剧创作 / 本土文化素材库",
          },
          {
            image: "/本土文化/采茶戏.jpg",
            name: "赣剧脸谱·包公黑面",
            subType: "赣剧艺术",
            desc: "包公黑底白线脸谱，刚正不阿象征，适合正义角色妆容参考。",
            creation: [
              { label: "元素类型", value: "脸谱妆容" },
              { label: "文化来源", value: "江西赣剧院" },
              { label: "适用场景", value: "角色妆容设计" },
            ],
            project: "天机匣·短剧创作 / 本土文化素材库",
          },
          {
            image: "/本土文化/采茶戏.jpg",
            name: "赣剧脸谱·曹操白面",
            subType: "赣剧艺术",
            desc: "曹操白底姎诈脸谱，适合反派角色设计参考。白色为底，细线勾画五官。",
            creation: [
              { label: "元素类型", value: "脸谱妆容" },
              { label: "文化来源", value: "江西赣剧院" },
              { label: "适用场景", value: "反派妆容设计" },
            ],
            project: "天机匣·短剧创作 / 本土文化素材库",
          },
          // 采茶戏
          {
            image: "/本土文化/采茶戏.jpg",
            name: "采茶戏·彩旦服饰",
            subType: "采茶戏",
            desc: "赣南采茶戏彩旦鲜艳服饰配色方案，红绿对比撞色。适用于古风角色的服装色彩搭配。",
            creation: [
              { label: "元素类型", value: "服饰配色" },
              { label: "文化来源", value: "赣南采茶戏团" },
              { label: "适用场景", value: "服装设计/色彩参考" },
            ],
            project: "天机匣·短剧创作 / 本土文化素材库",
          },
          {
            image: "/本土文化/采茶戏.jpg",
            name: "采茶戏·扇子功身段",
            subType: "采茶戏",
            desc: "采茶戏经典扇子舞动身段动作参考，可用于数字人动作设计。红扇翻转、腰身扭动组合。",
            creation: [
              { label: "元素类型", value: "动作身段" },
              { label: "文化来源", value: "赣南采茶戏团" },
              { label: "适用场景", value: "数字人动作设计" },
            ],
            project: "天机匣·短剧创作 / 本土文化素材库",
          },
          // 瓷文化
          {
            image: "/本土文化/景德镇陶瓷.png",
            name: "景德镇青花瓷配色",
            subType: "瓷文化",
            desc: "钴蓝色调+白底经典配色方案。适用于场景、道具色彩设计，古风淡雅风格。",
            creation: [
              { label: "元素类型", value: "色彩配色" },
              { label: "文化来源", value: "景德镇陶瓷博物馆" },
              { label: "适用场景", value: "色彩设计/道具纹样" },
            ],
            project: "天机匣·短剧创作 / 本土文化素材库",
          },
          
          
          // 赣鄱文化
          
          // 江西方言
          
          
        ],
      },
    ],
  },
  {
    key: "L3",
    level: 3,
    title: "数字人资产",
    slogan: "300+演员数字人分身",
    subs: [
      {
        key: "digital-human",
        label: "演员数字人分身",
        desc: "可复用的数字人演员，支持多角色演绎",
        icon: "🧑‍🎤",
        count: 327,
        stats: [
          { label: "已上线", value: "327 人" },
          { label: "本剧使用", value: "7 人" },
        ],
        thumbnails: [
          "/数字人/真人.jpg",
          "/数字人/真人2.jpg",
          "/数字人/真人.jpg",
          "/数字人/真人2.jpg",
        ],
        assetType: "digital-human",
        assetItems: [
          {
            image: "/人物/1_阿离_30515.png",
            realImage: "/数字人/真人.jpg",
            name: "阿离",
            role: "男主角",
            desc: "青年剑侠，性格坚韧隐忍。天机匣继承者，身负师父遗命行走江湖。擅长青衫剑法和身法，动作敏捷。",
            appearances: ["古道黄昏·雨中行", "客栈大堂·初遇", "二楼客房·警觉", "客栈后院·追踪", "大堂突变", "竹林对峙"],
            creation: [
              { label: "数字人编号", value: "DH-001" },
              { label: "生成模型", value: "文演数字人 v3.0" },
              { label: "动作库", value: "剑术/轻功/格斗" },
              { label: "表情库", value: "冷静/震惊/愤怒" },
            ],
            project: "天机匣 / 第1-12集",
          },
          {
            image: "/人物/2_老周头_30516.png",
            realImage: "/数字人/真人2.jpg",
            name: "老周头",
            role: "客栈掌柜",
            desc: "顺风客栈掌柜，表面老态龙钟，实为隐退江湖高手。缺一小指，暗器算珠绝技。沉稳老练，重情重义。",
            appearances: ["客栈大堂·初遇", "大堂突变", "客房回防"],
            creation: [
              { label: "数字人编号", value: "DH-002" },
              { label: "生成模型", value: "文演数字人 v3.0" },
              { label: "动作库", value: "算盘暗器/身法" },
              { label: "表情库", value: "苍老/凌厉/慈祥" },
            ],
            project: "天机匣 / 第1-8集",
          },
          {
            image: "/人物/3_柳大娘_30517.png",
            realImage: "/数字人/真人2.jpg",
            name: "柳大娘",
            role: "货商/暗卫",
            desc: "大嗓门女货商，实为师父旧部暗卫。擅长透骨钉暗器，性格爽朗泼辣。与老周头共同守护天机匣秘密。",
            appearances: ["客栈大堂·初遇", "大堂突变", "客房回防"],
            creation: [
              { label: "数字人编号", value: "DH-003" },
              { label: "生成模型", value: "文演数字人 v3.0" },
              { label: "动作库", value: "透骨钉/近身格斗" },
              { label: "表情库", value: "豪爽/关切/威严" },
            ],
            project: "天机匣 / 第1-10集",
          },
          {
            image: "/人物/4_小豆子_30518.png",
            realImage: "/数字人/真人.jpg",
            name: "小豆子",
            role: "店小二",
            desc: "顺风客栈跑堂少年，机灵好奇，爱打探消息。虽嘴碎但忠心，关键时刻敲锣示警起到重要作用。",
            appearances: ["客栈大堂·初遇", "大堂突变"],
            creation: [
              { label: "数字人编号", value: "DH-004" },
              { label: "生成模型", value: "文演数字人 v2.5" },
              { label: "动作库", value: "跑堂/敲锣/躲闪" },
              { label: "表情库", value: "好奇/惊慌/兴奋" },
            ],
            project: "天机匣 / 第1-6集",
          },
          {
            image: "/人物/5_黑袍人_30519.png",
            realImage: "/数字人/真人.jpg",
            name: "黑袍人",
            role: "神秘反派",
            desc: "青铜面具黑袍神秘人，灰白盲眼，身法如影。声音沙哑如电子合成。真实身份成谜，与阿离有渊源。",
            appearances: ["客栈后院·追踪", "大堂突变", "竹林对峙"],
            creation: [
              { label: "数字人编号", value: "DH-005" },
              { label: "生成模型", value: "文演数字人 v3.0" },
              { label: "动作库", value: "幻影步/掌法/隐匿" },
              { label: "表情库", value: "面具态/摘面态" },
            ],
            project: "天机匣 / 第1-12集",
          },
          {
            image: "/人物/6_黑袍人(摘下面具形态（与阿离相似、脸颊旧疤）)_30520.png",
            realImage: "/数字人/真人2.jpg",
            name: "师兄",
            role: "阿离师兄",
            desc: "摘下面具后与阿离七分相似的面容，脸颊有旧疤。本该死于二十年前的师兄，天机匣的关键人物。",
            appearances: ["竹林对峙", "幻境·回忆"],
            creation: [
              { label: "数字人编号", value: "DH-006" },
              { label: "生成模型", value: "文演数字人 v3.0" },
              { label: "动作库", value: "剑术/身法/暗器" },
              { label: "表情库", value: "冷漠/嘲讽/震惊" },
            ],
            project: "天机匣 / 第1集预告 / 第2-12集",
          },
          {
            image: "/人物/7_师父_30521.png",
            realImage: "/数字人/真人.jpg",
            name: "师父",
            role: "白袍老者",
            desc: "阿离的师父，天机匣的前任守护者。白袍负手，仙风道骨。将天机匣托付阿离后消逝，留下谜团。",
            appearances: ["幻境·回忆"],
            creation: [
              { label: "数字人编号", value: "DH-007" },
              { label: "生成模型", value: "文演数字人 v2.5" },
              { label: "动作库", value: "负手而立/转身" },
              { label: "表情库", value: "慈祥/沧桑/坚定" },
            ],
            project: "天机匣 / 第1集 / 回忆线",
          },
        ],
      },
    ],
  },
  {
    key: "L4",
    level: 4,
    title: "商业与信用资产",
    slogan: "金融确权，行业背书",
    subs: [
      {
        key: "credit",
        label: "生态信用资产",
        desc: "工作室评级、产能数据、履约记录",
        icon: "",
        count: 6,
        stats: [
          { label: "入驻工作室", value: "6 家" },
          { label: "AAA级", value: "2 家" },
        ],
        thumbnails: [],
        assetType: "studio",
        assetItems: [
          {
            image: "",
            name: "文演智能体工作室",
            badge: "AAA",
            tags: ["战略合作伙伴", "创始团队"],
            desc: "平台自有工作室，天机匣系列短剧主创团队。综合产能与良品率平台第一。",
            metrics: [
              { label: "出品短剧", value: "18", unit: "部" },
              { label: "团队人数", value: "24", unit: "人" },
              { label: "签约演员", value: "12", unit: "人" },
              { label: "良品率", value: "96.5", unit: "%" },
              { label: "月均产能", value: "3", unit: "部" },
            ],
            detailList: [
              { title: "出品短剧", type: "text", items: [
                { name: "天机匣·第1集 雨夜惊变" }, { name: "天机匣·第2集 古道迷踪" },
                { name: "天机匣·第3集 客栈风云" }, { name: "天机匣·第4集 竹林对峙" },
                { name: "天机匣·第5集 幻境启示" }, { name: "青云志·序章" },
                { name: "青云志·第1集 下山" }, { name: "赣鄱赋·瓷韵流光" },
                { name: "赣鄱赋·第2集 采茶调" }, { name: "红色记忆·井冈烽火" },
                { name: "红色记忆·第2集 星火" }, { name: "都市围城·第1集" },
                { name: "都市围城·第2集" }, { name: "星际迷航·前传" },
                { name: "星际迷航·第1集" }, { name: "江湖夜雨·第1集" },
                { name: "江湖夜雨·第2集" }, { name: "庐山谣·终章" },
              ]},
              { title: "核心团队", type: "avatar", items: [
                { name: "陈思远", sub: "总导演", image: "/数字人/真人.jpg" },
                { name: "林晓雯", sub: "制片人", image: "/数字人/真人2.jpg" },
                { name: "赵文渊", sub: "编剧组长", image: "/数字人/真人.jpg" },
                { name: "王诗涵", sub: "美术指导", image: "/数字人/真人2.jpg" },
                { name: "刘子轩", sub: "技术总监", image: "/数字人/真人.jpg" },
                { name: "张雨桐", sub: "后期主管", image: "/数字人/真人2.jpg" },
                { name: "黄浩然", sub: "特效组长", image: "/数字人/真人.jpg" },
                { name: "周敏", sub: "运营总监", image: "/数字人/真人2.jpg" },
              ]},
              { title: "签约演员", type: "avatar", items: [
                { name: "阿离", sub: "男主", image: "/人物/1_阿离_30515.png" },
                { name: "老周头", sub: "配角", image: "/人物/2_老周头_30516.png" },
                { name: "柳大娘", sub: "反派", image: "/人物/3_柳大娘_30517.png" },
                { name: "小豆子", sub: "配角", image: "/人物/4_小豆子_30518.png" },
                { name: "黑袍人", sub: "反派", image: "/人物/5_黑袍人_30519.png" },
                { name: "师父", sub: "配角", image: "/人物/7_师父_30521.png" },
                { name: "叶青霜", sub: "女主", image: "/数字人/真人2.jpg" },
                { name: "慕容轩", sub: "男主", image: "/数字人/真人.jpg" },
                { name: "苏婉清", sub: "女配", image: "/数字人/真人2.jpg" },
                { name: "萧云起", sub: "男配", image: "/数字人/真人.jpg" },
                { name: "红袖", sub: "女配", image: "/数字人/真人2.jpg" },
                { name: "陆小凤", sub: "客串", image: "/数字人/真人.jpg" },
              ]},
            ],
          },
          {
            image: "",
            name: "赣鄱光影工作室",
            badge: "AAA",
            tags: ["江西本土", "古风专精"],
            desc: "深耕江西本土文化题材，擅长古风/武侠类型短剧制作，多部作品播放量破千万。",
            metrics: [
              { label: "出品短剧", value: "14", unit: "部" },
              { label: "团队人数", value: "18", unit: "人" },
              { label: "签约演员", value: "8", unit: "人" },
              { label: "良品率", value: "94.2", unit: "%" },
              { label: "月均产能", value: "2", unit: "部" },
            ],
            detailList: [
              { title: "出品短剧", type: "text", items: [
                { name: "赣水谣·第1集" }, { name: "赣水谣·第2集" },
                { name: "豫章古道·序章" }, { name: "豫章古道·第1集" },
                { name: "滕王阁秘事·上" }, { name: "滕王阁秘事·下" },
                { name: "鄱阳湖传说·第1集" }, { name: "鄱阳湖传说·第2集" },
                { name: "庐山云雾·第1集" }, { name: "庐山云雾·第2集" },
                { name: "古村迷案·第1集" }, { name: "古村迷案·第2集" },
                { name: "青花缘·上" }, { name: "青花缘·下" },
              ]},
              { title: "核心团队", type: "avatar", items: [
                { name: "彭建国", sub: "总导演", image: "/数字人/真人.jpg" },
                { name: "李月华", sub: "制片人", image: "/数字人/真人2.jpg" },
                { name: "吴文清", sub: "编剧", image: "/数字人/真人.jpg" },
                { name: "徐小芸", sub: "美术", image: "/数字人/真人2.jpg" },
                { name: "胡明杰", sub: "摄影指导", image: "/数字人/真人.jpg" },
                { name: "杨思思", sub: "后期", image: "/数字人/真人2.jpg" },
              ]},
              { title: "签约演员", type: "avatar", items: [
                { name: "阿离", sub: "主演", image: "/人物/1_阿离_30515.png" },
                { name: "黑袍人", sub: "主演", image: "/人物/5_黑袍人_30519.png" },
                { name: "柳大娘", sub: "配角", image: "/人物/3_柳大娘_30517.png" },
                { name: "师父", sub: "配角", image: "/人物/7_师父_30521.png" },
                { name: "沈梦溪", sub: "女主", image: "/数字人/真人2.jpg" },
                { name: "韩子墨", sub: "男主", image: "/数字人/真人.jpg" },
                { name: "林晚秋", sub: "女配", image: "/数字人/真人2.jpg" },
                { name: "周伯通", sub: "配角", image: "/数字人/真人.jpg" },
              ]},
            ],
          },
          {
            image: "",
            name: "星河数字传媒",
            badge: "AA",
            tags: ["数字人专精", "AI原生"],
            desc: "以AI数字人技术为核心，拥有300+数字人资产库，专注科幻/都市题材。",
            metrics: [
              { label: "出品短剧", value: "11", unit: "部" },
              { label: "团队人数", value: "15", unit: "人" },
              { label: "数字人", value: "327", unit: "人" },
              { label: "良品率", value: "91.8", unit: "%" },
              { label: "月均产能", value: "3", unit: "部" },
            ],
            detailList: [
              { title: "出品短剧", type: "text", items: [
                { name: "星际迷航·第1集 逃离火星" }, { name: "星际迷航·第2集 暗物质" },
                { name: "都市围城·第1集 " }, { name: "都市围城·第2集" },
                { name: "都市围城·第3集" }, { name: "AI恋人·序章" },
                { name: "AI恋人·第1集" }, { name: "虚拟偶像·上" },
                { name: "虚拟偶像·下" }, { name: "赛博江湖·第1集" },
                { name: "赛博江湖·第2集" },
              ]},
              { title: "核心团队", type: "avatar", items: [
                { name: "孙浩宇", sub: "CEO/导演", image: "/数字人/真人.jpg" },
                { name: "马晓琳", sub: "COO", image: "/数字人/真人2.jpg" },
                { name: "钱多多", sub: "技术总监", image: "/数字人/真人.jpg" },
                { name: "冯小宝", sub: "AI工程师", image: "/数字人/真人2.jpg" },
                { name: "蒋天天", sub: "美术指导", image: "/数字人/真人.jpg" },
              ]},
              { title: "数字人演员", type: "avatar", items: [
                { name: "阿离·数字分身", sub: "数字人", image: "/人物/1_阿离_30515.png" },
                { name: "柳大娘·数字分身", sub: "数字人", image: "/人物/3_柳大娘_30517.png" },
                { name: "黑袍人·数字分身", sub: "数字人", image: "/人物/5_黑袍人_30519.png" },
                { name: "小豆子·数字分身", sub: "数字人", image: "/人物/4_小豆子_30518.png" },
                { name: "AI女主-01", sub: "数字人", image: "/数字人/真人2.jpg" },
                { name: "AI男主-02", sub: "数字人", image: "/数字人/真人.jpg" },
                { name: "AI配角-03", sub: "数字人", image: "/数字人/真人2.jpg" },
                { name: "AI配角-04", sub: "数字人", image: "/数字人/真人.jpg" },
              ]},
            ],
          },
          {
            image: "",
            name: "庐山明月工作室",
            badge: "AA",
            tags: ["红色题材", "主旋律"],
            desc: "专注红色文化与主旋律题材，与井冈山、瑞金等红色景区深度合作。",
            metrics: [
              { label: "出品短剧", value: "8", unit: "部" },
              { label: "团队人数", value: "12", unit: "人" },
              { label: "签约演员", value: "6", unit: "人" },
              { label: "良品率", value: "93.0", unit: "%" },
              { label: "月均产能", value: "1", unit: "部" },
            ],
            detailList: [
              { title: "出品短剧", type: "text", items: [
                { name: "红色记忆·井冈烽火" }, { name: "红色记忆·星火燎原" },
                { name: "瑞金岁月·第1集" }, { name: "瑞金岁月·第2集" },
                { name: "英雄儿女·上" }, { name: "英雄儿女·下" },
                { name: "长征路·序章" }, { name: "长征路·第1集" },
              ]},
              { title: "核心团队", type: "avatar", items: [
                { name: "方志明", sub: "总导演", image: "/数字人/真人.jpg" },
                { name: "何雪梅", sub: "制片人", image: "/数字人/真人2.jpg" },
                { name: "罗建军", sub: "编剧", image: "/数字人/真人.jpg" },
                { name: "宋美玲", sub: "美术", image: "/数字人/真人2.jpg" },
              ]},
              { title: "签约演员", type: "avatar", items: [
                { name: "老周头", sub: "主演", image: "/人物/2_老周头_30516.png" },
                { name: "师父", sub: "主演", image: "/人物/7_师父_30521.png" },
                { name: "小豆子", sub: "配角", image: "/人物/4_小豆子_30518.png" },
                { name: "赵英杰", sub: "男主", image: "/数字人/真人.jpg" },
                { name: "李雪琴", sub: "女主", image: "/数字人/真人2.jpg" },
                { name: "王大山", sub: "配角", image: "/数字人/真人.jpg" },
              ]},
            ],
          },
          {
            image: "",
            name: "青瓷创意工作室",
            badge: "A",
            tags: ["新锐团队", "国风动画"],
            desc: "以国风动画与短剧融合为特色，景德镇陶瓷文化系列广受好评。",
            metrics: [
              { label: "出品短剧", value: "5", unit: "部" },
              { label: "团队人数", value: "8", unit: "人" },
              { label: "签约演员", value: "4", unit: "人" },
              { label: "良品率", value: "88.5", unit: "%" },
              { label: "月均产能", value: "1", unit: "部" },
            ],
            detailList: [
              { title: "出品短剧", type: "text", items: [
                { name: "青花缘·第1集 窑火" }, { name: "青花缘·第2集 釉色" },
                { name: "采茶记·上" }, { name: "采茶记·下" },
                { name: "瓷韵流光·特别篇" },
              ]},
              { title: "核心团队", type: "avatar", items: [
                { name: "程一瓷", sub: "导演", image: "/数字人/真人.jpg" },
                { name: "林青花", sub: "制片", image: "/数字人/真人2.jpg" },
                { name: "高釉色", sub: "动画师", image: "/数字人/真人.jpg" },
                { name: "何窑火", sub: "美术", image: "/数字人/真人2.jpg" },
              ]},
              { title: "签约演员", type: "avatar", items: [
                { name: "阿离", sub: "配音", image: "/人物/1_阿离_30515.png" },
                { name: "柳大娘", sub: "配音", image: "/人物/3_柳大娘_30517.png" },
                { name: "苏小瓷", sub: "女主", image: "/数字人/真人2.jpg" },
                { name: "陶公子", sub: "男主", image: "/数字人/真人.jpg" },
              ]},
            ],
          },
          {
            image: "",
            name: "洪城快创团队",
            badge: "A",
            tags: ["短视频转型", "轻量化制作"],
            desc: "从传统短视频转型短剧赛道，擅长竖屏快节奏轻喜剧类型，产能高效。",
            metrics: [
              { label: "出品短剧", value: "9", unit: "部" },
              { label: "团队人数", value: "6", unit: "人" },
              { label: "签约演员", value: "5", unit: "人" },
              { label: "良品率", value: "86.0", unit: "%" },
              { label: "月均产能", value: "4", unit: "部" },
            ],
            detailList: [
              { title: "出品短剧", type: "text", items: [
                { name: "洪城往事·第1集" }, { name: "洪城往事·第2集" },
                { name: "快笑日记·1" }, { name: "快笑日记·2" },
                { name: "快笑日记·3" }, { name: "夜市江湖·上" },
                { name: "夜市江湖·下" }, { name: "邻居驾到·全篇" },
                { name: "快递侠·特别篇" },
              ]},
              { title: "核心团队", type: "avatar", items: [
                { name: "熊快创", sub: "导演", image: "/数字人/真人.jpg" },
                { name: "文小洪", sub: "制片", image: "/数字人/真人2.jpg" },
                { name: "邓子轩", sub: "编剧/摄影", image: "/数字人/真人.jpg" },
              ]},
              { title: "签约演员", type: "avatar", items: [
                { name: "小豆子", sub: "喜剧主演", image: "/人物/4_小豆子_30518.png" },
                { name: "老周头", sub: "配角", image: "/人物/2_老周头_30516.png" },
                { name: "张大锤", sub: "男主", image: "/数字人/真人.jpg" },
                { name: "李小美", sub: "女主", image: "/数字人/真人2.jpg" },
                { name: "王胖子", sub: "配角", image: "/数字人/真人.jpg" },
              ]},
            ],
          },
        ],
      },
      {
        key: "billing",
        label: "商业结算数据资产",
        desc: "Token消耗、模型调用、账单流水",
        icon: "",
        count: 6,
        stats: [
          { label: "本月消费", value: "¥38,600" },
          { label: "活跃工作室", value: "6 家" },
        ],
        thumbnails: [],
        assetType: "billing",
        assetItems: [
          {
            image: "",
            name: "文演智能体工作室",
            badge: "VIP",
            tags: ["企业版", "后付费"],
            desc: "平台自有工作室，使用企业版套餐，模型调用频次最高。",
            metrics: [
              { label: "Token消耗", value: "12.8M", unit: "tokens" },
              { label: "模型调用", value: "4,820", unit: "次" },
              { label: "本月费用", value: "¥12,480", unit: "" },
              { label: "视频合成", value: "86", unit: "分钟" },
              { label: "图片生成", value: "1,240", unit: "张" },
              { label: "数字人调用", value: "327", unit: "次" },
            ],
          },
          {
            image: "",
            name: "赣鄱光影工作室",
            badge: "企业",
            tags: ["企业版", "预付费"],
            desc: "江西本土头部工作室，古风/武侠题材产能突出。",
            metrics: [
              { label: "Token消耗", value: "8.2M", unit: "tokens" },
              { label: "模型调用", value: "3,150", unit: "次" },
              { label: "本月费用", value: "¥8,200", unit: "" },
              { label: "视频合成", value: "62", unit: "分钟" },
              { label: "图片生成", value: "880", unit: "张" },
              { label: "数字人调用", value: "45", unit: "次" },
            ],
          },
          {
            image: "",
            name: "星河数字传媒",
            badge: "企业",
            tags: ["企业版", "API接入"],
            desc: "数字人技术驱动型工作室，API调用量大。",
            metrics: [
              { label: "Token消耗", value: "6.5M", unit: "tokens" },
              { label: "模型调用", value: "5,200", unit: "次" },
              { label: "本月费用", value: "¥6,800", unit: "" },
              { label: "视频合成", value: "45", unit: "分钟" },
              { label: "图片生成", value: "620", unit: "张" },
              { label: "数字人调用", value: "280", unit: "次" },
            ],
          },
          {
            image: "",
            name: "庐山明月工作室",
            badge: "专业",
            tags: ["专业版", "预付费"],
            desc: "红色题材专业团队，制作周期较长但品质稳定。",
            metrics: [
              { label: "Token消耗", value: "3.1M", unit: "tokens" },
              { label: "模型调用", value: "1,420", unit: "次" },
              { label: "本月费用", value: "¥3,400", unit: "" },
              { label: "视频合成", value: "28", unit: "分钟" },
              { label: "图片生成", value: "350", unit: "张" },
              { label: "数字人调用", value: "12", unit: "次" },
            ],
          },
          {
            image: "",
            name: "青瓷创意工作室",
            badge: "专业",
            tags: ["专业版", "预付费"],
            desc: "新锐团队，动画制作为主，模型使用量稳步增长。",
            metrics: [
              { label: "Token消耗", value: "1.8M", unit: "tokens" },
              { label: "模型调用", value: "860", unit: "次" },
              { label: "本月费用", value: "¥2,100", unit: "" },
              { label: "视频合成", value: "18", unit: "分钟" },
              { label: "图片生成", value: "420", unit: "张" },
              { label: "数字人调用", value: "5", unit: "次" },
            ],
          },
          {
            image: "",
            name: "洪城快创团队",
            badge: "标准",
            tags: ["标准版", "按量付费"],
            desc: "轻量化制作团队，高频低量使用模式。",
            metrics: [
              { label: "Token消耗", value: "2.4M", unit: "tokens" },
              { label: "模型调用", value: "1,680", unit: "次" },
              { label: "本月费用", value: "¥2,800", unit: "" },
              { label: "视频合成", value: "35", unit: "分钟" },
              { label: "图片生成", value: "290", unit: "张" },
              { label: "数字人调用", value: "0", unit: "次" },
            ],
          },
        ],
      },
    ],
  },
  {
    key: "L5",
    level: 5,
    title: "舞美与服化道参考库",
    slogan: "轻量资产，高效复用",
    subs: [
      {
        key: "stage-ref",
        label: "舞美服化道参考",
        desc: "历史剧目舞美效果图、服装参考图、道具照片",
        icon: "🎭",
        count: 24,
        stats: [
          { label: "舞美效果图", value: "13 张" },
          { label: "道具参考", value: "11 件" },
        ],
        thumbnails: [
          "/场景/天机匣_场景资产_顺风客栈·大堂_内景(全景)_30534.png",
          "/场景/天机匣_场景资产_客栈后山竹林小径_外景(全景)_30528.png",
          "/道具/天机匣_道具资产_木匣(开启发光)_30550.png",
          "/道具/天机匣_道具资产_青铜面具_30557.png",
        ],
        assetType: "image",
        assetItems: [
          // 舞美效果图
          {
            image: "/场景/天机匣_场景资产_顺风客栈·大堂_内景(全景)_30534.png",
            name: "顺风客栈·大堂全景",
            subType: "舞美效果图",
            desc: "客栈大堂全景设计图，四张八仙桌布局、柜台账台、大门入口的完整空间设计。适用于古风室内场景设计参考。",
            creation: [
              { label: "场景类型", value: "内景全景" },
              { label: "适用剧本", value: "天机匣" },
              { label: "设计风格", value: "古风写实" },
            ],
            project: "天机匣·短剧创作 / 舞美参考库",
          },
          {
            image: "/场景/天机匣_场景资产_顺风客栈·大堂_内景(中央八仙桌通行区_夜雨)_30535.png",
            name: "大堂·八仙桌通行区",
            subType: "舞美效果图",
            desc: "大堂中央八仙桌区域近景，适合角色对话、群戏场景的构图参考。夜雨灯光氛围。",
            creation: [
              { label: "场景类型", value: "内景近景" },
              { label: "氛围", value: "夜雨暖灯" },
              { label: "用途", value: "对话场景构图" },
            ],
            project: "天机匣·短剧创作 / 舞美参考库",
          },
          {
            image: "/场景/天机匣_场景资产_顺风客栈·大堂_内景(北侧柜台账台区_夜雨)_30536.png",
            name: "大堂·柜台账台区",
            subType: "舞美效果图",
            desc: "北侧柜台与账台区域设计，老周头拨算盘的核心场景。木质柜台、账本、油灯布景。",
            creation: [
              { label: "场景类型", value: "内景局部" },
              { label: "氛围", value: "夜雨暖灯" },
              { label: "用途", value: "柜台交互场景" },
            ],
            project: "天机匣·短剧创作 / 舞美参考库",
          },
          {
            image: "/场景/天机匣_场景资产_顺风客栈·二楼客房_内景(全景)_30538.png",
            name: "二楼客房全景",
            subType: "舞美效果图",
            desc: "二楼客房完整空间设计，木床、方桌、油灯布局。阿离查看木匣的核心场景。",
            creation: [
              { label: "场景类型", value: "内景全景" },
              { label: "氛围", value: "夜雨幽暗" },
              { label: "用途", value: "情节高潮场景" },
            ],
            project: "天机匣·短剧创作 / 舞美参考库",
          },
          {
            image: "/场景/天机匣_场景资产_顺风客栈·后院_外景(全景)_30541.png",
            name: "客栈后院全景",
            subType: "舞美效果图",
            desc: "后院全景设计，柴火、水桶、杂物堆放布局。黑袍人现身的核心动作场景。",
            creation: [
              { label: "场景类型", value: "外景全景" },
              { label: "氛围", value: "夜雨泥泞" },
              { label: "用途", value: "动作/追踪场景" },
            ],
            project: "天机匣·短剧创作 / 舞美参考库",
          },
          {
            image: "/场景/天机匣_场景资产_客栈后山竹林小径_外景(全景)_30528.png",
            name: "后山竹林小径全景",
            subType: "舞美效果图",
            desc: "竹林小径全景设计，竹叶风雨中狂舞。阿离与师兄最终对峙的场景。",
            creation: [
              { label: "场景类型", value: "外景全景" },
              { label: "氛围", value: "夜雨肃杀" },
              { label: "用途", value: "悬念结尾场景" },
            ],
            project: "天机匣·短剧创作 / 舞美参考库",
          },
          {
            image: "/场景/天机匣_场景资产_江南古道驿道_外景(全景)_30531.png",
            name: "江南古道驿道全景",
            subType: "舞美效果图",
            desc: "青石板古驿道全景设计，秋雨绵绵、芦苇摇曳。阿离独行的开场场景。",
            creation: [
              { label: "场景类型", value: "外景全景" },
              { label: "氛围", value: "黄昏秋雨" },
              { label: "用途", value: "开场引入场景" },
            ],
            project: "天机匣·短剧创作 / 舞美参考库",
          },
          {
            image: "/场景/天机匣_场景资产_天机匣幻境金色空间_外景(全景)_30525.png",
            name: "天机匣幻境·金色空间",
            subType: "舞美效果图",
            desc: "天机匣开启后的幻境空间设计，金色光芒、云端场景。师父嘱托的超现实场景。",
            creation: [
              { label: "场景类型", value: "特效幻境" },
              { label: "氛围", value: "金色光芒" },
              { label: "用途", value: "回忆/幻境场景" },
            ],
            project: "天机匣·短剧创作 / 舞美参考库",
          },
          // 道具参考
          {
            image: "/道具/天机匣_道具资产_木匣(开启发光)_30550.png",
            name: "天机匣·木匣（开启发光态）",
            subType: "道具参考",
            desc: "天机匣核心道具，铜锁锈蚀、匣身云纹。开启后金色光芒流动，刻有“天机匣”三字。",
            creation: [
              { label: "道具类型", value: "核心道具" },
              { label: "材质", value: "古木+铜锁" },
              { label: "特效", value: "金色发光" },
            ],
            project: "天机匣·短剧创作 / 道具参考库",
          },
          {
            image: "/道具/天机匣_道具资产_木匣_30549.png",
            name: "天机匣·木匣（关闭态）",
            subType: "道具参考",
            desc: "天机匣关闭状态，铜锁完整、云纹清晰。适用于常规携带、护送场景。",
            creation: [
              { label: "道具类型", value: "核心道具" },
              { label: "材质", value: "古木+铜锁" },
              { label: "特效", value: "无" },
            ],
            project: "天机匣·短剧创作 / 道具参考库",
          },
          {
            image: "/道具/天机匣_道具资产_短剑_30553.png",
            name: "阿离短剑",
            subType: "道具参考",
            desc: "阿离随身佩剑，习武之人标配。剑未出鞘为主要悬念元素。",
            creation: [
              { label: "道具类型", value: "角色配饰" },
              { label: "材质", value: "精钢剑身" },
              { label: "归属角色", value: "阿离" },
            ],
            project: "天机匣·短剧创作 / 道具参考库",
          },
          {
            image: "/道具/天机匣_道具资产_算盘_30554.png",
            name: "老周头算盘",
            subType: "道具参考",
            desc: "老周头标志性道具，既算账又当暗器使用。算珠可飞射而出。",
            creation: [
              { label: "道具类型", value: "暗器/日常" },
              { label: "材质", value: "木质算珠" },
              { label: "归属角色", value: "老周头" },
            ],
            project: "天机匣·短剧创作 / 道具参考库",
          },
          {
            image: "/道具/天机匣_道具资产_青铜面具_30557.png",
            name: "黑袍人青铜面具",
            subType: "道具参考",
            desc: "黑袍人的青铜面具，冷光质感。摘下后露出与阿离相似的面容，核心悬念道具。",
            creation: [
              { label: "道具类型", value: "核心悬念道具" },
              { label: "材质", value: "青铜" },
              { label: "归属角色", value: "黑袍人/师兄" },
            ],
            project: "天机匣·短剧创作 / 道具参考库",
          },
          {
            image: "/道具/天机匣_道具资产_透骨钉_30555.png",
            name: "柳大娘透骨钉",
            subType: "道具参考",
            desc: "柳大娘暗器，三枚呈品字形射出。透骨钉为其身份标识之一。",
            creation: [
              { label: "道具类型", value: "暗器" },
              { label: "材质", value: "精铁" },
              { label: "归属角色", value: "柳大娘" },
            ],
            project: "天机匣·短剧创作 / 道具参考库",
          },
          {
            image: "/道具/天机匣_道具资产_铜锣_30547.png",
            name: "小豆子铜锣",
            subType: "道具参考",
            desc: "小豆子敲响示警的铜锣，“走水啦——”的关键道具。古铜质感，小巧可单手挥敲。",
            creation: [
              { label: "道具类型", value: "日常/示警" },
              { label: "材质", value: "黄铜" },
              { label: "归属角色", value: "小豆子" },
            ],
            project: "天机匣·短剧创作 / 道具参考库",
          },
          {
            image: "/道具/天机匣_道具资产_钥匙_30548.png",
            name: "客栈钥匙",
            subType: "道具参考",
            desc: "顺风客房钥匙，递钥匙时老周头缺指细节的重要道具。",
            creation: [
              { label: "道具类型", value: "日常道具" },
              { label: "材质", value: "铁质老钥匙" },
              { label: "归属角色", value: "老周头/阿离" },
            ],
            project: "天机匣·短剧创作 / 道具参考库",
          },
          {
            image: "/道具/天机匣_道具资产_货箱_30556.png",
            name: "柳大娘货箱",
            subType: "道具参考",
            desc: "柳大娘的巨型货箱，箱面刻有神秘符号。既是伪装身份也是暗器机关箱。",
            creation: [
              { label: "道具类型", value: "身份道具" },
              { label: "材质", value: "木箱+铁件" },
              { label: "归属角色", value: "柳大娘" },
            ],
            project: "天机匣·短剧创作 / 道具参考库",
          },
          {
            image: "/道具/天机匣_道具资产_荷包_30552.png",
            name: "阿离荷包",
            subType: "道具参考",
            desc: "阿离腰间荷包，老周头观察的目标之一。朴素布制，行走江湖的标准配饰。",
            creation: [
              { label: "道具类型", value: "角色配饰" },
              { label: "材质", value: "粗布" },
              { label: "归属角色", value: "阿离" },
            ],
            project: "天机匣·短剧创作 / 道具参考库",
          },
          {
            image: "/道具/天机匣_道具资产_包袱_30551.png",
            name: "阿离包袱",
            subType: "道具参考",
            desc: "阿离背着的包袱，内裹天机匣木匣。用身体护住不被雨淋的核心携带道具。",
            creation: [
              { label: "道具类型", value: "核心道具容器" },
              { label: "材质", value: "粗布" },
              { label: "归属角色", value: "阿离" },
            ],
            project: "天机匣·短剧创作 / 道具参考库",
          },
        ],
      },
    ],
  },
  {
    key: "L6",
    level: 6,
    title: "本土演艺元素库",
    slogan: "视觉标识，独有壁垒",
    subs: [
      {
        key: "jiangxi-elements",
        label: "赣鄱演艺元素",
        desc: "赣剧脸谱、采茶戏服饰、红色实景场景、景德镇瓷文化配色",
        icon: "🎨",
        count: 6,
        stats: [
          { label: "采茶戏", value: "3 项" },
          { label: "瓷文化", value: "3 项" },
        ],
        thumbnails: [
          "/本土文化/采茶戏.jpg",
          "/本土文化/景德镇陶瓷.png",
        ],
        assetType: "image",
        assetItems: [
          // 采茶戏
          {
            image: "/本土文化/采茶戏.jpg",
            name: "赣南采茶戏·经典身段",
            subType: "采茶戏",
            desc: "赣南采茶戏是国家级非物质文化遗产，以欢快活泼的矮子步、单袖筒、扇子花为标志。本图展示了采茶戏经典身段，适用于舞蹈动作参考与服化道设计。",
            creation: [
              { label: "非遗级别", value: "国家级" },
              { label: "流行区域", value: "赣南地区" },
              { label: "参考用途", value: "身段/服化道" },
            ],
            project: "本土演艺元素库 / 采茶戏系列",
          },
          {
            image: "/本土文化/采茶戏.jpg",
            name: "采茶戏·特色服饰",
            subType: "采茶戏",
            desc: "采茶戏服饰以彩袖、花头巾为核心视觉标识，色彩鲜丽明快。适用于现代短剧中的地方戏曲元素融合参考。",
            creation: [
              { label: "服饰特征", value: "彩袖/花头巾" },
              { label: "配色", value: "红绿撞色" },
              { label: "参考用途", value: "服装设计" },
            ],
            project: "本土演艺元素库 / 采茶戏系列",
          },
          {
            image: "/本土文化/采茶戏.jpg",
            name: "采茶戏·矮子步法",
            subType: "采茶戏",
            desc: "矮子步是采茶戏最具代表性的步法之一，屈膝矮身、快捷灵动。适用于动作设计、舞蹈编排的本土元素参考。",
            creation: [
              { label: "步法特征", value: "屈膝矮身" },
              { label: "难度", value: "中高" },
              { label: "参考用途", value: "动作编排" },
            ],
            project: "本土演艺元素库 / 采茶戏系列",
          },
          // 景德镇瓷文化
          {
            image: "/本土文化/景德镇陶瓷.png",
            name: "景德镇青花瓷·经典纹样",
            subType: "瓷文化",
            desc: "景德镇青花瓷以钻料绘制、釉下蓝白对比闻名世界。本图展示了经典青花瓷纹样，适用于场景道具配色、视觉风格参考。",
            creation: [
              { label: "工艺", value: "釉下青花" },
              { label: "代表色", value: "青蓝/素白" },
              { label: "参考用途", value: "配色/道具" },
            ],
            project: "本土演艺元素库 / 瓷文化系列",
          },
          {
            image: "/本土文化/景德镇陶瓷.png",
            name: "瓷文化·釉色体系",
            subType: "瓷文化",
            desc: "景德镇四大传统名瓷：青花、玲珑、粉彩、颜色釉。本图收录了代表性釉色，可用于短剧场景色彩规划与道具设计。",
            creation: [
              { label: "名瓷类别", value: "青花/玲珑/粉彩/色釉" },
              { label: "色彩体系", value: "青蓝/粉彩/窑变" },
              { label: "参考用途", value: "色彩方案" },
            ],
            project: "本土演艺元素库 / 瓷文化系列",
          },
          {
            image: "/本土文化/景德镇陶瓷.png",
            name: "瓷文化·陶瓷器型参考",
            subType: "瓷文化",
            desc: "景德镇经典器型包括梅瓶、玉壶春、葫芦瓶等。适用于古装短剧中的道具陈设与场景布置参考。",
            creation: [
              { label: "经典器型", value: "梅瓶/玉壶春/葫芦瓶" },
              { label: "材质质感", value: "釉面莹润" },
              { label: "参考用途", value: "陈设道具" },
            ],
            project: "本土演艺元素库 / 瓷文化系列",
          },
        ],
      },
    ],
  },
];

export default function DigitalAssetLibraryPage({
  onHome,
  layerKey,
  onClearLayer,
  onAssetLibrary,
  onAssetLayer,
}: {
  onHome?: () => void;
  layerKey?: string | null;
  onClearLayer?: () => void;
  onAssetLibrary?: () => void;
  onAssetLayer?: (key: string) => void;
}) {
  const [selectedSub, setSelectedSub] = useState<SubCategory | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<AssetLayer | null>(null);
  const [collapsedLayers, setCollapsedLayers] = useState<Set<string>>(new Set());
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
    const [lightboxRealImg, setLightboxRealImg] = useState<string | null>(null);
  const [detailItem, setDetailItem] = useState<AssetItem | null>(null);
  const [detailTab, setDetailTab] = useState(0);
    const [assetFilter, setAssetFilter] = useState<string>("全部");
      const [playingIdx, setPlayingIdx] = useState<number | null>(null);
        const [videoItem, setVideoItem] = useState<AssetItem | null>(null);
        const [videoPlaying, setVideoPlaying] = useState(false);
          const [videoFrame, setVideoFrame] = useState(0);
      const [playProgress, setPlayProgress] = useState(0);
        const playTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
      const audioCtxRef = useRef<AudioContext | null>(null);
      const activeNodesRef = useRef<AudioNode[]>([]);

      // ===== Web Audio synthesis =====
      const stopAllSound = () => {
        activeNodesRef.current.forEach((n) => {
          try { (n as OscillatorNode).stop?.(); } catch {}
          try { n.disconnect(); } catch {}
        });
        activeNodesRef.current = [];
      };

      const ensureCtx = () => {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
        }
        return audioCtxRef.current;
      };

      const playVoice = (ctx: AudioContext, freq: number, duration: number, vibrato: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        lfo.frequency.value = 5;
        lfoGain.gain.value = vibrato;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.1);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + duration * 0.6);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        lfo.start();
        osc.stop(ctx.currentTime + duration);
        lfo.stop(ctx.currentTime + duration);
        activeNodesRef.current.push(osc, lfo, gain, lfoGain);
      };

      const playBGM = (ctx: AudioContext) => {
        // Chinese pentatonic scale: C D E G A (pentatonic)
        const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33];
        const melody = [0, 2, 4, 3, 2, 0, 1, 3, 5, 4, 2, 0];
        const noteDur = 0.4;
        melody.forEach((noteIdx, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = i % 2 === 0 ? "triangle" : "sine";
          osc.frequency.value = scale[noteIdx];
          const t0 = ctx.currentTime + i * noteDur;
          gain.gain.setValueAtTime(0, t0);
          gain.gain.linearRampToValueAtTime(0.1, t0 + 0.05);
          gain.gain.linearRampToValueAtTime(0, t0 + noteDur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t0);
          osc.stop(t0 + noteDur);
          activeNodesRef.current.push(osc, gain);
        });
      };

      const playNoise = (ctx: AudioContext, type: string, duration: number) => {
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1);
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        if (type === "rain") {
          filter.type = "lowpass";
          filter.frequency.value = 2000;
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
        } else if (type === "sword") {
          filter.type = "highpass";
          filter.frequency.value = 3000;
          gain.gain.setValueAtTime(0.4, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
          source.loop = true;
        } else if (type === "heartbeat") {
          filter.type = "lowpass";
          filter.frequency.value = 150;
          gain.gain.setValueAtTime(0, ctx.currentTime);
          // Two thumps
          gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.05);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
          gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.35);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
          source.loop = true;
        } else if (type === "creak") {
          filter.type = "bandpass";
          filter.frequency.setValueAtTime(800, ctx.currentTime);
          filter.frequency.linearRampToValueAtTime(400, ctx.currentTime + duration);
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
        } else if (type === "steps") {
          filter.type = "lowpass";
          filter.frequency.value = 300;
          gain.gain.setValueAtTime(0, ctx.currentTime);
          // 4 footsteps
          for (let s = 0; s < 4; s++) {
            const t = ctx.currentTime + s * 0.3;
            gain.gain.linearRampToValueAtTime(0.3, t + 0.02);
            gain.gain.linearRampToValueAtTime(0, t + 0.15);
          }
          source.loop = true;
        } else {
          // cups / generic
          filter.type = "highpass";
          filter.frequency.value = 2500;
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
        }
        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        source.start();
        source.stop(ctx.currentTime + duration);
        activeNodesRef.current.push(source, filter, gain);
      };

      const playSoundFor = (item: AssetItem) => {
        stopAllSound();
        const ctx = ensureCtx();
        const sub = item.subType ?? "";
        if (sub === "AI音色") {
          const freqMap: Record<string, number> = {
            "阿离·少御音": 340, "老周头·沧桑音": 130, "黑袍人·阴嗓": 95,
            "柳大娘·温暖音": 250, "小豆子·清脆童音": 400, "师父·空灵音": 200,
          };
          const f = freqMap[item.name] ?? 250;
          playVoice(ctx, f, 2.5, 8);
        } else if (sub === "BGM") {
          playBGM(ctx);
        } else if (sub === "音效") {
          const typeMap: Record<string, string> = {
            "雷雨环境音": "rain", "刀剑碰撞": "sword", "心跳加速": "heartbeat",
            "木匣开启": "creak", "脚步声·竹林": "steps", "客栈杯碟碰撞": "cups",
          };
          const t = typeMap[item.name] ?? "rain";
          playNoise(ctx, t, Math.min(4, parseFloat(item.duration?.replace(":", ".") ?? "0.1") || 2));
        }
      };

      useEffect(() => {
        if (playingIdx !== null) {
          setPlayProgress(0);
          playTimerRef.current = setInterval(() => {
            setPlayProgress((p) => {
              if (p >= 100) {
                if (playTimerRef.current) clearInterval(playTimerRef.current);
                stopAllSound();
                setPlayingIdx(null);
                return 0;
              }
              return p + 1.5;
            });
          }, 50);
        } else {
          if (playTimerRef.current) clearInterval(playTimerRef.current);
          stopAllSound();
          setPlayProgress(0);
        }
        return () => {
          if (playTimerRef.current) clearInterval(playTimerRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [playingIdx]);

      useEffect(() => {
        return () => { stopAllSound(); };
      }, []);

      // ===== Video progress timer =====
      useEffect(() => {
        if (videoPlaying && videoItem) {
          setPlayProgress(0);
          setVideoFrame(0);
          playTimerRef.current = setInterval(() => {
            setPlayProgress((p) => {
              if (p >= 100) {
                if (playTimerRef.current) clearInterval(playTimerRef.current);
                setVideoPlaying(false);
                return 0;
              }
              return p + 1.2;
            });
            setVideoFrame((f) => f + 1);
          }, 50);
        }
        return () => {
          if (playTimerRef.current) clearInterval(playTimerRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [videoPlaying]);
    
        const togglePlay = (idx: number, asset?: AssetItem) => {
          if (playingIdx === idx) {
            setPlayingIdx(null);
          } else {
            if (asset) playSoundFor(asset);
            setPlayingIdx(idx);
          }
        };

  const parseDuration = (d: string) => {
    const parts = d.split(":").map(Number);
    return parts.length === 2 ? parts[0] * 60 + parts[1] : parts[0] || 0;
  };

  const toggleLayer = (key: string) => {
    setCollapsedLayers((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="page">
      <div className="bg-layer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg-image" src="/bg.png" alt="" />
        <div className="bg-overlay" />
      </div>

      <Navbar onHome={onHome} onAssetLibrary={onAssetLibrary} onAssetLayer={onAssetLayer} activeNav="asset-library" />

      <div className="analysis-page asset-library-page">
        {/* Breadcrumb */}
        <div className="dal-breadcrumb">
          <span className="dal-crumb" onClick={onHome} style={{ cursor: onHome ? "pointer" : "default" }}>首页</span>
          <span className="dal-crumb-sep">/</span>
          {selectedSub ? (
            <>
              <span className="dal-crumb-current">数字资产库</span>
              <span className="dal-crumb-sep">/</span>
              <span className="dal-crumb" onClick={() => { setSelectedSub(null); }} style={{ cursor: "pointer" }}>{selectedLayer?.title ?? LAYERS.find((l) => l.key === layerKey)?.title ?? "资产库"}</span>
              <span className="dal-crumb-sep">/</span>
              <span className="dal-crumb-current">{selectedSub.label}</span>
            </>
          ) : layerKey ? (
            <>
              <span className="dal-crumb-current">数字资产库</span>
              <span className="dal-crumb-sep">/</span>
              <span className="dal-crumb-current">{LAYERS.find((l) => l.key === layerKey)?.title ?? "资产库"}</span>
            </>
          ) : (
            <span className="dal-crumb-current">数字资产库</span>
          )}
        </div>

        {/* ====== Main View ====== */}
        {!selectedSub && (
          layerKey ? (
            /* When arriving from nav dropdown, show only sub-category rows directly */
            <div className="dal-layers">
              {(LAYERS.find((l) => l.key === layerKey)?.subs ?? []).map((sub) => {
                const layer = LAYERS.find((l) => l.key === layerKey)!;
                return (
                  <div key={sub.key} className="dal-cat-row" onClick={() => { setSelectedLayer(layer); setSelectedSub(sub); setAssetFilter("全部"); }}>
                    <div className="dal-row-left">
                      <div className="dal-row-icon-sm">
                        {sub.icon}
                      </div>
                      <div className="dal-row-title-area">
                        <div className="dal-row-title">{sub.label}</div>
                        <div className="dal-row-sub">{sub.desc}</div>
                      </div>
                    </div>

                    <div className="dal-row-thumbs">
                      {sub.thumbnails.length > 0 ? (
                        sub.thumbnails.map((img, i) => (
                          <div key={i} className="dal-row-thumb">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img} alt="" />
                          </div>
                        ))
                      ) : sub.assetType === "audio" ? (
                        <div className="dal-row-waveform">
                          {[40,70,50,90,60,35,80,55,75,45,65,30,85].map((h, i) => (
                            <span key={i} className="wf-bar" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      ) : sub.assetType === "video" && sub.assetItems ? (
                        sub.assetItems.slice(0, 4).map((item, i) => (
                          <div key={i} className="dal-row-film" style={{ background: "linear-gradient(135deg, #1a1a2e, #0f3460)" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }} />
                            <span className="dal-row-film-label">{item.subType}</span>
                          </div>
                        ))
                      ) : sub.assetType === "video" && sub.thumbnails.length > 0 ? (
                        sub.thumbnails.slice(0, 4).map((img, i) => (
                          <div key={i} className="dal-row-film">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }} />
                          </div>
                        ))
                      ) : sub.items ? (
                        sub.items.slice(0, 6).map((item, i) => (
                          <div key={i} className="dal-row-tagcard" style={{ borderColor: item.color }}>
                            <span className="dal-row-tagcard-dot" style={{ background: item.color }} />
                            <span className="dal-row-tagcard-text">{item.tag}</span>
                          </div>
                        ))
                      ) : (
                        <div className="dal-row-noimg">
                          <span>📊</span>
                        </div>
                      )}
                    </div>

                    <div className="dal-row-right">
                      <div className="dal-row-stats">
                        <div className="dal-row-stat-main">
                          <span className="dal-row-stat-num">{sub.count}</span>
                          <span className="dal-row-stat-unit">项</span>
                        </div>
                        {sub.stats.map((st) => (
                          <div key={st.label} className="dal-row-stat-extra">
                            <span className="dal-row-stat-elabel">{st.label}</span>
                            <span className="dal-row-stat-evalue">{st.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="dal-row-arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Full 5-layer view with headers */
            <div className="dal-layers">
              {LAYERS.map((layer) => {
              const isCollapsed = collapsedLayers.has(layer.key);
              return (
                <div key={layer.key} className="dal-layer">
                  {/* Layer header */}
                  <div className="dal-layer-header" onClick={() => toggleLayer(layer.key)}>
                    <div className="dal-layer-badge">{layer.level}</div>
                    <div className="dal-layer-titles">
                      <span className="dal-layer-name">第{["一", "二", "三", "四", "五", "六"][layer.level - 1]}层 · {layer.title}</span>
                      <span className="dal-layer-slogan">{layer.slogan}</span>
                    </div>
                    <div className="dal-layer-count-pill">
                      {layer.subs.reduce((s, sub) => s + sub.count, 0)} 项资产
                    </div>
                    <div className={`dal-layer-chevron ${isCollapsed ? "collapsed" : ""}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  {/* Sub-category rows */}
                  {!isCollapsed && (
                    <div className="dal-layer-subs">
                      {layer.subs.map((sub) => (
                        <div key={sub.key} className="dal-cat-row" onClick={() => { setSelectedLayer(layer); setSelectedSub(sub); setAssetFilter("全部"); }}>
                          <div className="dal-row-left">
                            <div className="dal-row-icon-sm">
                              {sub.icon}
                            </div>
                            <div className="dal-row-title-area">
                              <div className="dal-row-title">{sub.label}</div>
                              <div className="dal-row-sub">{sub.desc}</div>
                            </div>
                          </div>

                          <div className="dal-row-thumbs">
                            {sub.thumbnails.length > 0 ? (
                              sub.thumbnails.map((img, i) => (
                                <div key={i} className="dal-row-thumb">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={img} alt="" />
                                </div>
                              ))
                            ) : sub.assetType === "audio" ? (
                              <div className="dal-row-waveform">
                                {[40,70,50,90,60,35,80,55,75,45,65,30,85].map((h, i) => (
                                  <span key={i} className="wf-bar" style={{ height: `${h}%` }} />
                                ))}
                              </div>
                            ) : sub.assetType === "video" && sub.assetItems ? (
                              sub.assetItems.slice(0, 4).map((item, i) => (
                                <div key={i} className="dal-row-film" style={{ background: "linear-gradient(135deg, #1a1a2e, #0f3460)" }}>
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }} />
                                  <span className="dal-row-film-label">{item.subType}</span>
                                </div>
                              ))
                            ) : sub.assetType === "video" && sub.thumbnails.length > 0 ? (
                              sub.thumbnails.slice(0, 4).map((img, i) => (
                                <div key={i} className="dal-row-film">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }} />
                                </div>
                              ))
                            ) : sub.items ? (
                              sub.items.slice(0, 6).map((item, i) => (
                                <div key={i} className="dal-row-tagcard" style={{ borderColor: item.color }}>
                                  <span className="dal-row-tagcard-dot" style={{ background: item.color }} />
                                  <span className="dal-row-tagcard-text">{item.tag}</span>
                                </div>
                              ))
                            ) : (
                              <div className="dal-row-noimg">
                                <span>📊</span>
                              </div>
                            )}
                          </div>

                          <div className="dal-row-right">
                            <div className="dal-row-stats">
                              <div className="dal-row-stat-main">
                                <span className="dal-row-stat-num">{sub.count}</span>
                                <span className="dal-row-stat-unit">项</span>
                              </div>
                              {sub.stats.map((st) => (
                                <div key={st.label} className="dal-row-stat-extra">
                                  <span className="dal-row-stat-elabel">{st.label}</span>
                                  <span className="dal-row-stat-evalue">{st.value}</span>
                                </div>
                              ))}
                            </div>
                            <div className="dal-row-arrow">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          )
        )}

        {/* ====== Sub-category Detail View ====== */}
        {selectedSub && (
          <div className="dal-content">
            {/* Asset items grid - show detailed named cards if assetItems exist */}
            {selectedSub.assetItems ? (
              (() => {
                const items = selectedSub.assetItems!;
                const subTypes = Array.from(new Set(items.map((i) => i.subType).filter(Boolean))) as string[];
                const hasSubTypes = subTypes.length > 0;
                const filtered = hasSubTypes && assetFilter !== "全部" ? items.filter((i) => i.subType === assetFilter) : items;
                return (
                  <>
                    {hasSubTypes && (
                      <div className="dal-filter-tabs">
                        {subTypes.map((st) => (
                          <span
                            key={st}
                            className={`dal-filter-tab ${assetFilter === st ? "active" : ""}`}
                            onClick={() => setAssetFilter(st)}
                          >
                            {st}
                            <span className="dal-filter-tab-count">{items.filter((i) => i.subType === st).length}</span>
                          </span>
                        ))}
                      </div>
                    )}
                    {selectedSub.assetType === "audio" ? (
                      <div className="dal-audio-list">
                        {filtered.map((asset, idx) => {
                          const isPlaying = playingIdx === idx;
                          const waveBars = [25,45,30,60,40,70,35,55,20,50,65,30,45,25,40,60,35,50,30,55,40,25,45,60,30,50,35,45,25,40,55,30,60,40,25,45,35,50,30,65];
                          const activeBars = Math.floor((playProgress / 100) * waveBars.length);
                          return (
                            <div key={idx} className={`dal-audio-card ${isPlaying ? "playing" : ""}`}>
                              <div className="dal-audio-play-btn" onClick={() => togglePlay(idx, asset)}>
                                {isPlaying ? (
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="6" y="5" width="4" height="14" rx="1" />
                                    <rect x="14" y="5" width="4" height="14" rx="1" />
                                  </svg>
                                ) : (
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                )}
                              </div>
                              <div className="dal-audio-info">
                                <div className="dal-audio-name-row">
                                  <span className="dal-audio-name">{asset.name}</span>
                                  <span className="dal-audio-type-tag">{asset.subType}</span>
                                  <span className="dal-audio-duration">{asset.duration}</span>
                                </div>
                                <div className="dal-audio-desc">{asset.desc}</div>
                                <div className="dal-audio-wave">
                                  {waveBars.map((h, i) => (
                                    <span
                                      key={i}
                                      className={`dal-wave-bar ${isPlaying && i <= activeBars ? "active" : ""} ${isPlaying && i === activeBars ? "peak" : ""}`}
                                      style={{ height: `${h}%` }}
                                    />
                                  ))}
                                </div>
                                {isPlaying && (
                                  <div className="dal-audio-progress">
                                    <div className="dal-audio-progress-bar" style={{ width: `${playProgress}%` }} />
                                  </div>
                                )}
                              </div>
                              <button className="dal-asset-detail-btn" onClick={() => setDetailItem(asset)}>
                                详情
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : selectedSub.assetType === "video" ? (
                      <div className="dal-asset-grid">
                        {filtered.map((asset, idx) => (
                          <div key={idx} className="dal-asset-card">
                            <div className="dal-asset-video-poster" onClick={() => { setVideoItem(asset); setVideoPlaying(true); setPlayProgress(0); }}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={asset.image} alt={asset.name} />
                              <div className="dal-video-play-overlay">
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                              <span className="dal-video-duration-tag">{asset.duration}</span>
                            </div>
                            <div className="dal-asset-info">
                              <div className="dal-asset-name-row">
                                <span className="dal-asset-name">{asset.name}</span>
                              </div>
                              <button className="dal-asset-detail-btn" onClick={() => setDetailItem(asset)}>
                                详情
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : selectedSub.assetType === "digital-human" ? (
                      <div className="dal-dh-grid">
                        {filtered.map((asset, idx) => (
                          <div key={idx} className="dal-dh-card">
                            <div className="dal-dh-photo" onClick={() => { setLightboxRealImg(asset.realImage ?? null); setLightboxImg(asset.image); }}>
                              <div className="dal-dh-split">
                                <div className="dal-dh-half dal-dh-left">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={asset.realImage ?? asset.image} alt={asset.name} />
                                  <span className="dal-dh-half-label">真人</span>
                                </div>
                                <div className="dal-dh-half dal-dh-right">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={asset.image} alt={asset.name} />
                                  <span className="dal-dh-half-label">数字人</span>
                                </div>
                              </div>
                              <div className="dal-asset-magnifier">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                                  <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                              </div>
                            </div>
                            <div className="dal-asset-info">
                              <div className="dal-asset-name-row">
                                <span className="dal-asset-name">{asset.name}</span>
                                {asset.role && <span className="dal-asset-role">{asset.role}</span>}
                              </div>
                              <button className="dal-asset-detail-btn" onClick={() => setDetailItem(asset)}>
                                详情
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : selectedSub.assetType === "studio" ? (
                      <div className="dal-studio-grid">
                        {filtered.map((asset, idx) => (
                          <div key={idx} className="dal-studio-card" onClick={() => { setDetailItem(asset); setDetailTab(0); }}>
                            <div className="dal-studio-header">
                              <div className="dal-studio-avatar">{asset.name.charAt(0)}</div>
                              <div className="dal-studio-title-area">
                                <div className="dal-studio-name-row">
                                  <span className="dal-studio-name">{asset.name}</span>
                                  {asset.badge && <span className={`dal-studio-badge dal-studio-badge-${asset.badge.toLowerCase()}`}>{asset.badge}</span>}
                                </div>
                                <div className="dal-studio-tags">
                                  {asset.tags?.map((tag) => <span key={tag} className="dal-studio-tag">{tag}</span>)}
                                </div>
                              </div>
                            </div>
                            <p className="dal-studio-desc">{asset.desc}</p>
                            <div className="dal-studio-metrics">
                              {asset.metrics?.map((m) => (
                                <div key={m.label} className="dal-studio-metric">
                                  <div className="dal-studio-metric-value">{m.value}{m.unit && m.unit !== "" && <span className="dal-studio-metric-unit">{m.unit}</span>}</div>
                                  <div className="dal-studio-metric-label">{m.label}</div>
                                </div>
                              ))}
                            </div>
                            <button className="dal-studio-hover-btn" onClick={(e) => { e.stopPropagation(); setDetailItem(asset); setDetailTab(0); }}>查看详情</button>
                          </div>
                        ))}
                      </div>
                    ) : selectedSub.assetType === "billing" ? (
                      <div className="dal-billing-list">
                        {filtered.map((asset, idx) => (
                          <div key={idx} className="dal-billing-row" onClick={() => { setDetailItem(asset); setDetailTab(0); }}>
                            <div className="dal-billing-avatar">{asset.name.charAt(0)}</div>
                            <span className="dal-billing-name">{asset.name}</span>
                            {asset.badge && <span className={`dal-studio-badge dal-studio-badge-${asset.badge.toLowerCase()}`}>{asset.badge}</span>}
                            {asset.tags?.map((tag) => <span key={tag} className="dal-studio-tag">{tag}</span>)}
                            <div className="dal-billing-metrics">
                              {asset.metrics?.slice(0, 3).map((m) => (
                                <span key={m.label} className="dal-billing-metric-item">{m.label} <strong>{m.value}{m.unit && m.unit !== "" ? ` ${m.unit}` : ""}</strong></span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="dal-asset-grid">
                        {filtered.map((asset, idx) => (
                          <div key={idx} className="dal-asset-card">
                            <div className="dal-asset-photo" onClick={() => setLightboxImg(asset.image)}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={asset.image} alt={asset.name} />
                              <div className="dal-asset-magnifier">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                                  <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                              </div>
                            </div>
                            <div className="dal-asset-info">
                              <div className="dal-asset-name-row">
                                <span className="dal-asset-name">{asset.name}</span>
                                {asset.subType && <span className="dal-asset-role">{asset.subType}</span>}
                                {asset.role && <span className="dal-asset-role">{asset.role}</span>}
                              </div>
                              <button className="dal-asset-detail-btn" onClick={() => setDetailItem(asset)}>
                                详情
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()
            ) : selectedSub.items ? (
              <div className="dal-items-grid">
                {selectedSub.items.map((item, idx) => (
                  <div key={idx} className="dal-item-card">
                    <div className="dal-item-card-color" style={{ background: item.color }}>
                      {selectedSub.assetType === "audio" ? (
                        <div className="dal-item-card-wave">
                          {[30,60,45,80,50,35,70].map((h, i) => (
                            <span key={i} style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      ) : (
                        <span className="dal-item-card-icon">{selectedSub.icon}</span>
                      )}
                    </div>
                    <div className="dal-item-card-body">
                      <div className="dal-item-card-name">{item.name}</div>
                      <div className="dal-item-card-desc">{item.desc}</div>
                      <span className="dal-item-card-tag" style={{ borderColor: item.color, color: item.color }}>{item.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedSub.thumbnails.length > 0 ? (
              <div className="dal-items-grid dal-items-imggrid">
                {selectedSub.thumbnails.map((img, i) => (
                  <div key={i} className="dal-item-img" onClick={() => setLightboxImg(img)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" />
                    <div className="dal-asset-magnifier">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                        <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="dal-sub-placeholder">
                <div className="dal-sub-ph-icon">📊</div>
                <div className="dal-sub-ph-text">
                  <span className="dal-sub-ph-title">{selectedSub.count} 项资产</span>
                  <span className="dal-sub-ph-sub">暂无详细数据</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ====== Video Player Modal ====== */}
      {videoItem && (() => {
        const frames = videoItem.shots && videoItem.shots.length > 0
          ? videoItem.shots.map((s) => s.image)
          : [videoItem.image];
        const currentFrameIdx = videoPlaying ? Math.min(Math.floor((playProgress / 100) * frames.length), frames.length - 1) : 0;
        const currentShotName = videoItem.shots && videoItem.shots.length > 0
          ? videoItem.shots[currentFrameIdx]?.name ?? videoItem.name
          : videoItem.name;
        const currentShotDesc = videoItem.shots && videoItem.shots.length > 0
          ? videoItem.shots[currentFrameIdx]?.desc ?? ""
          : "";
        const totalSecs = parseDuration(videoItem.duration ?? "0:05");
        const elapsedSecs = videoPlaying ? Math.floor(playProgress / 100 * totalSecs) : 0;
        const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
        return (
        <div className="dal-video-overlay" onClick={() => { setVideoPlaying(false); setVideoItem(null); }}>
          <div className="dal-video-player" onClick={(e) => e.stopPropagation()}>
            <div className="dal-video-close" onClick={() => { setVideoPlaying(false); setVideoItem(null); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="dal-video-screen">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={currentFrameIdx}
                src={frames[currentFrameIdx]}
                alt={videoItem.name}
                className={`dal-video-frame ${videoPlaying ? "playing" : ""}`}
              />
              {videoPlaying && <div className="dal-video-scanline" />}
              {videoPlaying && <div className="dal-video-rec-badge">● REC</div>}
              <div className="dal-video-title-row">
                <span className="dal-video-title-name">{videoPlaying ? currentShotName : videoItem.name}</span>
                <span className="dal-video-title-type">{videoPlaying && currentShotDesc ? currentShotDesc : videoItem.subType}</span>
              </div>
            </div>
            <div className="dal-video-controls">
              <div className="dal-video-progress-track">
                <div className="dal-video-progress-fill" style={{ width: `${playProgress}%` }} />
              </div>
              {videoItem.shots && videoItem.shots.length > 0 && (
                <div className="dal-video-chapters">
                  {videoItem.shots.map((s, i) => (
                    <div
                      key={i}
                      className={`dal-video-chapter ${i === currentFrameIdx && videoPlaying ? "active" : ""}`}
                      onClick={() => {
                        const targetPct = ((i + 0.5) / videoItem.shots!.length) * 100;
                        setPlayProgress(targetPct);
                      }}
                    >
                      <span className="dal-video-chapter-idx">{i + 1}</span>
                      <span className="dal-video-chapter-name">{s.name}</span>
                      <span className="dal-video-chapter-dur">{s.duration}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="dal-video-ctrl-row">
                <div className="dal-video-ctrl-left" onClick={() => setVideoPlaying((p) => !p)}>
                  {videoPlaying ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </div>
                <span className="dal-video-time">
                  {fmtTime(elapsedSecs)} / {videoItem.duration}
                </span>
                <button className="dal-asset-detail-btn" onClick={() => { setVideoPlaying(false); setDetailItem(videoItem); }}>
                  详情
                </button>
              </div>
            </div>
          </div>
        </div>
        );
      })()}

      {/* ====== Lightbox Modal (outside overflow containers) ====== */}
      {lightboxImg && (
        <div className="dal-lightbox-overlay" onClick={() => { setLightboxImg(null); setLightboxRealImg(null); }}>
          {lightboxRealImg ? (
            <div className="dal-lightbox-split" onClick={(e) => e.stopPropagation()}>
              <div className="dal-lightbox-half dal-lightbox-left">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lightboxRealImg} alt="真人" />
                <span className="dal-dh-half-label">真人</span>
              </div>
              <div className="dal-lightbox-half dal-lightbox-right">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lightboxImg} alt="数字人" />
                <span className="dal-dh-half-label">数字人</span>
              </div>
            </div>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={lightboxImg} alt="" className="dal-lightbox-img" />
          )}
          <div className="dal-lightbox-close" onClick={(e) => { e.stopPropagation(); setLightboxImg(null); setLightboxRealImg(null); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      )}

      {/* ====== Large Studio Detail Modal ====== */}
      {detailItem && detailItem.detailList && detailItem.detailList.length > 0 && (
        <div className="dal-studio-detail-overlay" onClick={() => setDetailItem(null)}>
          <div className="dal-studio-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dal-studio-detail-close" onClick={() => setDetailItem(null)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="dal-studio-detail-body">
              {/* Left: intro + stats */}
              <div className="dal-studio-detail-left">
                <div className="dal-studio-detail-header">
                  <div className={`dal-studio-detail-avatar ${detailItem.badge === "VIP" || detailItem.badge === "\u4f01\u4e1a" ? "dal-billing-avatar" : ""}`}>{detailItem.name.charAt(0)}</div>
                  <div>
                    <div className="dal-studio-detail-name-row">
                      <h2 className="dal-studio-detail-name">{detailItem.name}</h2>
                      {detailItem.badge && <span className={`dal-studio-badge dal-studio-badge-${detailItem.badge.toLowerCase()}`}>{detailItem.badge}</span>}
                    </div>
                    {detailItem.tags && (
                      <div className="dal-studio-tags">
                        {detailItem.tags.map((t) => <span key={t} className="dal-studio-tag">{t}</span>)}
                      </div>
                    )}
                  </div>
                </div>
                <p className="dal-studio-detail-intro">{detailItem.desc}</p>
                {detailItem.metrics && (
                  <div className="dal-studio-detail-stats">
                    {detailItem.metrics.map((m) => (
                      <div key={m.label} className="dal-studio-detail-stat">
                        <div className="dal-studio-detail-stat-value">{m.value}{m.unit && m.unit !== "" && <span className="dal-studio-detail-stat-unit">{m.unit}</span>}</div>
                        <div className="dal-studio-detail-stat-label">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Right: detailed lists — tabbed layout */}
              <div className="dal-studio-detail-right">
                {/* Tab bar */}
                <div className="dal-studio-detail-tabs">
                  {detailItem.detailList.map((section, ti) => (
                    <button
                      key={section.title}
                      className={`dal-studio-detail-tab ${detailTab === ti ? "active" : ""}`}
                      onClick={() => setDetailTab(ti)}
                    >
                      {section.title}
                      <span className="dal-studio-detail-tab-count">{section.items.length}</span>
                    </button>
                  ))}
                </div>
                {/* Tab content */}
                <div className="dal-studio-detail-tab-content">
                  {(() => {
                    const section = detailItem.detailList[detailTab];
                    if (!section) return null;
                    return section.type === "text" ? (
                      <div className="dal-studio-detail-text-list">
                        {section.items.map((item, i) => (
                          <div key={i} className="dal-studio-detail-text-item">
                            <span className="dal-studio-detail-text-dot" />
                            <span>{item.name}</span>
                            {item.sub && <span className="dal-studio-detail-text-sub">{item.sub}</span>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="dal-studio-detail-avatar-grid">
                        {section.items.map((item, i) => (
                          <div key={i} className="dal-studio-detail-person">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.image} alt={item.name} />
                            <span className="dal-studio-detail-person-name">{item.name}</span>
                            {item.sub && <span className="dal-studio-detail-person-role">{item.sub}</span>}
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====== Asset Detail Modal (outside overflow containers) ====== */}
      {detailItem && (!detailItem.detailList || detailItem.detailList.length === 0) && (
        <div className="dal-detail-overlay" onClick={() => setDetailItem(null)}>
          <div className="dal-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dal-detail-close" onClick={() => setDetailItem(null)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="dal-detail-body">
              <div className="dal-detail-left">
                {detailItem.image ? (
                  selectedLayer?.key === "L3" || selectedSub?.assetType === "digital-human" ? (
                    <div className="dal-dh-split" style={{ aspectRatio: "3 / 4" }}>
                      <div className="dal-dh-half dal-dh-left">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={detailItem.realImage ?? detailItem.image} alt={detailItem.name} />
                        <span className="dal-dh-half-label">真人</span>
                      </div>
                      <div className="dal-dh-half dal-dh-right">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={detailItem.image} alt={detailItem.name} />
                        <span className="dal-dh-half-label">数字人</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={detailItem.image} alt={detailItem.name} />
                    </>
                  )
                ) : detailItem.metrics ? (
                  <div className="dal-detail-studio-placeholder">
                    <div className={`dal-studio-avatar ${detailItem.badge === "VIP" || detailItem.badge === "\u4f01\u4e1a" ? "dal-billing-avatar" : ""}`} style={{ width: "72px", height: "72px", fontSize: "32px", borderRadius: "14px" }}>
                      {detailItem.name.charAt(0)}
                    </div>
                    {detailItem.badge && <span className="dal-studio-badge" style={{ marginTop: "10px" }}>{detailItem.badge}</span>}
                  </div>
                ) : (
                  <div className="dal-detail-audio-placeholder">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    {detailItem.duration && <span className="dal-detail-duration">⏱ {detailItem.duration}</span>}
                  </div>
                )}
              </div>
              <div className="dal-detail-right">
                <div className="dal-detail-name-row">
                  <h3 className="dal-detail-name">{detailItem.name}</h3>
                  {detailItem.role && <span className="dal-detail-role-tag">{detailItem.role}</span>}
                </div>
                <p className="dal-detail-desc">{detailItem.desc}</p>

                {detailItem.metrics && detailItem.metrics.length > 0 && (
                  <div className="dal-detail-section">
                    <div className="dal-detail-section-title">数据指标</div>
                    <div className="dal-studio-metrics" style={{ margin: "0" }}>
                      {detailItem.metrics.map((m) => (
                        <div key={m.label} className="dal-studio-metric">
                          <div className="dal-studio-metric-value">{m.value}{m.unit && m.unit !== "" && <span className="dal-studio-metric-unit">{m.unit}</span>}</div>
                          <div className="dal-studio-metric-label">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {detailItem.tags && detailItem.tags.length > 0 && (
                  <div className="dal-detail-section">
                    <div className="dal-detail-tags">
                      {detailItem.tags.map((t) => (
                        <span key={t} className="dal-detail-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                {detailItem.creation && (
                  <div className="dal-detail-section">
                    <div className="dal-detail-section-title">创作信息</div>
                    <div className="dal-detail-kv-list">
                      {detailItem.creation.map((c) => (
                        <div key={c.label} className="dal-detail-kv">
                          <span className="dal-detail-kv-label">{c.label}</span>
                          <span className="dal-detail-kv-value">{c.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {detailItem.appearances && detailItem.appearances.length > 0 && (
                  <div className="dal-detail-section">
                    <div className="dal-detail-section-title">出现场景（{detailItem.appearances.length}）</div>
                    <div className="dal-detail-tags">
                      {detailItem.appearances.map((ap) => (
                        <span key={ap} className="dal-detail-tag">{ap}</span>
                      ))}
                    </div>
                  </div>
                )}

                {detailItem.project && (
                  <div className="dal-detail-section">
                    <div className="dal-detail-section-title">所属项目</div>
                    <div className="dal-detail-project">{detailItem.project}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Storyboard shots grid */}
            {detailItem.shots && detailItem.shots.length > 0 && (
              <div className="dal-detail-shots">
                <div className="dal-detail-shots-title">分镜片段（{detailItem.shots.length} 个镜头）</div>
                <div className="dal-detail-shots-grid">
                  {detailItem.shots.map((shot, si) => (
                    <div
                      key={si}
                      className="dal-shot-card"
                      onClick={() => {
                        setVideoItem({
                          image: shot.image,
                          name: shot.name,
                          desc: shot.desc,
                          duration: shot.duration,
                          subType: "分镜片段",
                          creation: detailItem.creation,
                          project: detailItem.project,
                        });
                        setVideoPlaying(true);
                        setPlayProgress(0);
                      }}
                    >
                      <div className="dal-shot-poster">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={shot.image} alt={shot.name} />
                        <div className="dal-shot-play-overlay">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <span className="dal-video-duration-tag">{shot.duration}</span>
                      </div>
                      <div className="dal-shot-info">
                        <span className="dal-shot-name">{shot.name}</span>
                        <span className="dal-shot-desc">{shot.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
