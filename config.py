# 应用配置
APP_CONFIG = {
    'page_title': '数据可视化平台 - 第二章',
    'page_icon': '📊',
    'layout': 'wide'
}

# 样式配置
STYLE_CONFIG = {
    'font_family': 'SimHei',
    'primary_color': '#1f77b4',
    'secondary_color': '#ff7f0e',
    'background_color': '#f0f2f6'
}

# 图表配置
CHART_CONFIG = {
    "折线图": {
        "title": "折线图 - 未来15天最高气温和最低气温",
        "description": "折线图用于显示数据随时间或其他连续变量的变化趋势。适合展示时间序列数据和趋势分析。",
        "icon": "📈"
    },
    "柱形图": {
        "title": "柱形图 - 2013-2019财年阿里巴巴GMV统计",
        "description": "柱形图用于比较不同类别的数值大小。适合展示分类数据的对比关系。",
        "icon": "📊"
    },
    "条形图": {
        "title": "条形图 - 各商品种类的网购替代率",
        "description": "条形图是柱形图的水平版本，适合类别名称较长或需要水平排列的场景。",
        "icon": "📋"
    },
    "堆积面积图": {
        "title": "堆积面积图 - 物流公司物流费用统计",
        "description": "堆积面积图显示多个数据系列随时间的累积变化，适合展示构成比例和总量变化。",
        "icon": "📈"
    },
    "直方图": {
        "title": "直方图 - 成绩分布统计",
        "description": "直方图用于显示数据的分布情况，将数据分成多个区间并统计每个区间的频数。",
        "icon": "📊"
    },
    "饼图": {
        "title": "饼图 - 数据分布比例",
        "description": "饼图用于显示各部分占整体的比例关系，适合展示构成比例和百分比数据。",
        "icon": "🥧"
    },
    "散点图": {
        "title": "散点图 - 汽车速度与制动距离的关系",
        "description": "散点图用于显示两个变量之间的关系，适合分析变量间的相关性和分布模式。",
        "icon": "🔍"
    },
    "箱形图": {
        "title": "箱形图 - 2017年和2018年全国发电量统计",
        "description": "箱形图显示数据的分布特征，包括中位数、四分位数、异常值等统计信息。",
        "icon": "📦"
    },
    "雷达图": {
        "title": "雷达图 - 霍兰德职业兴趣测试",
        "description": "雷达图用于多维数据的可视化，适合展示多个维度的综合评估和比较。",
        "icon": "🎯"
    },
    "误差棒图": {
        "title": "误差棒图 - 测量数据误差展示",
        "description": "误差棒图显示数据的测量不确定度或变异性，适合科学实验数据的可视化。",
        "icon": "📏"
    }
}

# 颜色配置
COLOR_PALETTE = [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
]

# 图表尺寸配置
FIGURE_CONFIG = {
    'width': 10,
    'height': 6,
    'dpi': 100
}

# 数据验证规则
VALIDATION_RULES = {
    'min_data_points': 3,
    'max_data_points': 1000,
    'allowed_data_types': ['int', 'float', 'str']
}