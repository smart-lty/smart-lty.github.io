---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

Hi there! I am Tianyu Liu, a third-year joint Ph.D. student at USTC and Shanghai AI Laboratory, supervised by [Sun Xiao](https://jimmysuen.github.io/).

My research interest mainly lie in <b>efficient inference for LLM</b>. I’m currently working on *speculative decoding*, a promising technique for acclerating LLM inference. I’m looking to collaborate on relative topics, mainly about inference techniques.

# 🔥 News
- *2025.01*: &nbsp; [PEARL](https://arxiv.org/pdf/2408.11850) is accepted  to [ICLR 2025](https://iclr.cc/Conferences/2025)!
- *2025.01*: &nbsp; One paper accepted to [NAACL 2025](https://2025.naacl.org/). Thanks for the carry of [Qitan](https://shiliu-egg.github.io/)!
- *2023.09*: &nbsp; [REST](https://arxiv.org/abs/2408.07088) is accepted to [NeurIPS 2023](https://nips.cc/Conferences/2023)!

# 📝 Publications 

†: corresponding author; *:equal contribution

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ICLR 2025</div><img src='https://s2.loli.net/2024/08/13/aoCAybN7S2KWsXd.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**PEARL: Parallel Speculative Decoding with Adaptive Draft Length**

**Tianyu Liu**,
Yun Li<sup>†</sup>, 
[Qitan Lv](https://shiliu-egg.github.io/), 
Kai Liu, 
Jianchen Zhu, 
Winston Hu, 
[Xiao Sun](https://jimmysuen.github.io/)<sup>†</sup>

[**[Paper]**](https://arxiv.org/pdf/2408.11850)&nbsp;
[**[Project]**](http://pearl-code.github.io/)&nbsp;
[**[Code]**](https://github.com/smart-lty/ParallelSpeculativeDecoding)&nbsp;

</div>
</div>


<div class='paper-box'><div class='paper-box-image'><div><div class="badge">NAACL 2025</div><img src='images/gso.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**Exploiting Edited Large Language Models as General Scientific Optimizers**

[Qitan Lv](https://shiliu-egg.github.io/)<sup>*</sup>, 
**Tianyu Liu**<sup>*</sup>,
[Hong Wang](https://wanghong1700.github.io/)<sup>†</sup>

[**[Paper]**](https://arxiv.org/pdf/2503.09620)&nbsp;

</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">NeurIPS 2023</div><img src='images/rest.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

**Learning Rule-Induced Subgraph Representations for Inductive Relation Prediction**

**Tianyu Liu**,
[Qitan Lv](https://shiliu-egg.github.io/), 
Jie Wang<sup>†</sup>,
Shuling Yang, 
Hanzhu Chen,

[**[Paper]**](https://arxiv.org/pdf/2408.07088)&nbsp;
[**[Code]**](https://github.com/smart-lty/REST)&nbsp;

</div>
</div>


# 📖 Educations
- *2022.09 - Present*, Ph.D. in Department of Electronic Engineering and Information Science, University of Science and Technology of China.
- *2018.09 - 2022.06*, B.Sc. in Computure Science and Technology, Central University of Finance and Economics.

# 🖥️ Professional Services
- Conference reviewer for ICLR'25, WWW'25, NeurIPS'25.