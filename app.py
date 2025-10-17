import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib as mpl
import base64
from io import BytesIO

# 导入自定义模块
try:
    from utils import generate_sample_data, validate_data, create_download_link, data_to_dataframe
    from config import CHART_CONFIG, STYLE_CONFIG, APP_CONFIG
except ImportError:
    # 如果导入失败，定义必要的函数和配置
    CHART_CONFIG = {
        "折线图": {"title": "折线图", "description": "显示数据变化趋势"},
        "柱形图": {"title": "柱形图", "description": "比较不同类别的数值"},
        "条形图": {"title": "条形图", "description": "水平排列的分类数据比较"},
        "堆积面积图": {"title": "堆积面积图", "description": "显示多系列累积变化"},
        "直方图": {"title": "直方图", "description": "显示数据分布情况"},
        "饼图": {"title": "饼图", "description": "显示各部分占整体的比例"},
        "散点图": {"title": "散点图", "description": "显示两个变量之间的关系"},
        "箱形图": {"title": "箱形图", "description": "显示数据分布特征"},
        "雷达图": {"title": "雷达图", "description": "多维数据的可视化"},
        "误差棒图": {"title": "误差棒图", "description": "显示测量数据误差"}
    }
    
    STYLE_CONFIG = {'font_family': 'SimHei'}
    APP_CONFIG = {'page_title': '数据可视化平台', 'page_icon': '📊', 'layout': 'wide'}
    
    def generate_sample_data(chart_type):
        return {"x": np.arange(10), "y": np.random.rand(10)}
    
    def validate_data(data, chart_type):
        return True, "数据验证通过"
    
    def create_download_link(fig, chart_type, text, format='png'):
        buf = BytesIO()
        fig.savefig(buf, format=format, dpi=300, bbox_inches='tight')
        buf.seek(0)
        b64 = base64.b64encode(buf.read()).decode()
        href = f'<a href="data:image/{format};base64,{b64}" download="{chart_type}.{format}">{text}</a>'
        return href
    
    def data_to_dataframe(data, chart_type):
        return pd.DataFrame(data)

# 设置中文字体和样式
plt.rcParams['font.sans-serif'] = [STYLE_CONFIG['font_family']]
plt.rcParams['axes.unicode_minus'] = False
mpl.rcParams['font.sans-serif'] = [STYLE_CONFIG['font_family']]
mpl.rcParams['axes.unicode_minus'] = False

st.set_page_config(
    page_title=APP_CONFIG['page_title'], 
    page_icon=APP_CONFIG['page_icon'], 
    layout=APP_CONFIG['layout']
)

st.title("📊 基于第二章知识的数据可视化平台")
st.markdown("本平台整合了第二章中介绍的所有数据可视化图表类型，提供交互式数据探索体验")

# 侧边栏导航
st.sidebar.header("📈 图表选择")
chart_types = list(CHART_CONFIG.keys())
chart_type = st.sidebar.selectbox("选择图表类型", chart_types)

# 显示当前图表配置信息
chart_info = CHART_CONFIG[chart_type]
st.sidebar.markdown(f"**图表说明:** {chart_info['description']}")

# 图表绘制函数
def plot_chart(chart_type, data):
    fig, ax = plt.subplots(figsize=(10, 6))
    
    if chart_type == "折线图":
        ax.plot(data["x"], data["y_max"], label='最高气温')
        ax.plot(data["x"], data["y_min"], label='最低气温')
        ax.set_xlabel('天数')
        ax.set_ylabel('温度 (°C)')
        ax.set_title('未来15天最高气温和最低气温')
        ax.legend()
        
    elif chart_type == "柱形图":
        ax.bar(data["x"], data["y"], tick_label=["FY2013", "FY2014", "FY2015", "FY2016", 
                                               "FY2017", "FY2018", "FY2019"], width=0.5)
        ax.set_xlabel('财年')
        ax.set_ylabel('GMV (亿元)')
        ax.set_title('2013-2019财年阿里巴巴淘宝和天猫平台的GMV')
        
    elif chart_type == "条形图":
        ax.barh(data["y"], data["x"], tick_label=data["labels"], align="center", height=0.6)
        ax.set_xlabel('替代率')
        ax.set_title('各商品种类的网购替代率')
        
    elif chart_type == "堆积面积图":
        ax.stackplot(data["x"], data["y_a"], data["y_b"], data["y_c"], 
                    labels=['物流公司A', '物流公司B', '物流公司C'])
        ax.set_xlabel('月份')
        ax.set_ylabel('物流费用 (万元)')
        ax.set_title('物流公司物流费用统计')
        ax.legend()
        
    elif chart_type == "直方图":
        ax.hist(data["scores"], bins=8, histtype='stepfilled', alpha=0.7)
        ax.set_xlabel('分数')
        ax.set_ylabel('频数')
        ax.set_title('成绩分布直方图')
        
    elif chart_type == "饼图":
        ax.pie(data["data"], labels=data["labels"], autopct='%3.1f%%', startangle=90)
        ax.set_title('数据分布饼图')
        
    elif chart_type == "散点图":
        ax.scatter(data["x"], data["y"], s=50, alpha=0.9)
        ax.set_xlabel('速度 (km/h)')
        ax.set_ylabel('制动距离 (m)')
        ax.set_title('汽车速度与制动距离的关系')
        
    elif chart_type == "箱形图":
        ax.boxplot([data["data_2018"], data["data_2017"]], labels=('2018年', '2017年'),
                  meanline=True, widths=0.5, patch_artist=True)
        ax.set_ylabel('发电量 (亿千瓦时)')
        ax.set_title('2017年和2018年全国发电量统计')
        
    elif chart_type == "雷达图":
        dim_num = len(data["labels"])
        angles = np.linspace(0, 2 * np.pi, dim_num, endpoint=False)
        angles = np.concatenate((angles, [angles[0]]))
        
        for i, row in enumerate(data["data"]):
            row = np.concatenate((row, [row[0]]))
            ax.plot(angles, row, 'o-', linewidth=2, label=f'样本{i+1}')
            ax.fill(angles, row, alpha=0.25)
        
        labels = np.concatenate((data["labels"], [data["labels"][0]]))
        ax.set_thetagrids(angles * 180/np.pi, labels)
        ax.set_title('霍兰德职业兴趣测试雷达图')
        ax.legend()
        
    elif chart_type == "误差棒图":
        ax.errorbar(data["x"], data["y"], yerr=data["y_offset"], capsize=3, capthick=2, marker='o')
        ax.set_xlabel('样本')
        ax.set_ylabel('测量值')
        ax.set_title('测量数据误差棒图')
    
    plt.tight_layout()
    return fig

# 数据配置
st.sidebar.header("⚙️ 数据配置")
use_sample_data = st.sidebar.checkbox("使用示例数据", value=True)

if use_sample_data:
    data = generate_sample_data(chart_type)
    st.sidebar.success("✅ 使用第二章示例数据")
else:
    st.sidebar.info("🔧 自定义数据功能开发中...")
    data = generate_sample_data(chart_type)  # 暂时使用示例数据

# 数据验证
is_valid, message = validate_data(data, chart_type)
if not is_valid:
    st.error(f"数据验证失败: {message}")
    st.stop()

# 显示图表
st.header(f"📊 {chart_type}可视化")
st.markdown(f"### {chart_info['title']}")

fig = plot_chart(chart_type, data)
st.pyplot(fig)

# 图表说明
st.markdown("---")
st.subheader("📝 图表说明")
st.write(chart_info['description'])
st.write("**应用场景:**")
if chart_type == "折线图":
    st.write("- 时间序列数据分析")
    st.write("- 趋势预测和监控")
    st.write("- 多变量对比分析")
elif chart_type == "柱形图":
    st.write("- 分类数据比较")
    st.write("- 业绩指标展示")
    st.write("- 市场份额分析")
elif chart_type == "条形图":
    st.write("- 长类别名称数据")
    st.write("- 排名和排序展示")
    st.write("- 调查结果呈现")
elif chart_type == "堆积面积图":
    st.write("- 多系列累积效果")
    st.write("- 构成比例分析")
    st.write("- 时间序列构成")
elif chart_type == "直方图":
    st.write("- 数据分布分析")
    st.write("- 频率统计")
    st.write("- 异常值检测")
elif chart_type == "饼图":
    st.write("- 比例关系展示")
    st.write("- 构成分析")
    st.write("- 市场份额")
elif chart_type == "散点图":
    st.write("- 变量关系分析")
    st.write("- 相关性研究")
    st.write("- 聚类分析")
elif chart_type == "箱形图":
    st.write("- 数据分布特征")
    st.write("- 异常值检测")
    st.write("- 多组数据比较")
elif chart_type == "雷达图":
    st.write("- 多维数据比较")
    st.write("- 能力评估")
    st.write("- 综合评价")
elif chart_type == "误差棒图":
    st.write("- 测量不确定度")
    st.write("- 实验数据展示")
    st.write("- 统计显著性")

# 下载功能
st.markdown("---")
st.subheader("💾 下载图表")
col1, col2, col3 = st.columns(3)

with col1:
    st.markdown(create_download_link(fig, chart_type, "📥 下载PNG格式", 'png'), unsafe_allow_html=True)

with col2:
    st.markdown(create_download_link(fig, chart_type, "📥 下载SVG格式", 'svg'), unsafe_allow_html=True)

with col3:
    st.markdown(create_download_link(fig, chart_type, "📥 下载PDF格式", 'pdf'), unsafe_allow_html=True)

# 显示数据表格
st.markdown("---")
st.subheader("📋 数据预览")
df = data_to_dataframe(data, chart_type)
st.dataframe(df, use_container_width=True)

# 数据统计信息
st.subheader("📊 数据统计")
col1, col2, col3 = st.columns(3)

with col1:
    st.metric("数据点数", len(df))

with col2:
    if '数值' in df.columns or 'GMV' in df.columns or '温度' in str(df.columns):
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        if len(numeric_cols) > 0:
            st.metric("平均值", f"{df[numeric_cols[0]].mean():.2f}")

with col3:
    if len(numeric_cols) > 0:
        st.metric("标准差", f"{df[numeric_cols[0]].std():.2f}")