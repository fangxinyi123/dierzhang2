import numpy as np
import pandas as pd
import base64
from io import BytesIO

def generate_sample_data(chart_type):
    """根据图表类型生成第二章的示例数据"""
    
    if chart_type == "折线图":
        # 未来15天最高气温和最低气温
        return {
            "x": np.arange(4, 19),
            "y_max": np.array([32, 33, 34, 34, 33, 31, 30, 29, 30, 29, 26, 23, 21, 25, 31]),
            "y_min": np.array([19, 19, 20, 22, 22, 21, 22, 16, 18, 18, 17, 14, 15, 16, 16])
        }
    
    elif chart_type == "柱形图":
        # 2013-2019财年阿里巴巴淘宝和天猫平台的GMV
        return {
            "x": np.arange(1, 8),
            "y": np.array([10770, 16780, 24440, 30920, 37670, 48200, 57270])
        }
    
    elif chart_type == "条形图":
        # 各商品种类的网购替代率
        return {
            "y": np.arange(1, 19),
            "x": np.array([0.959, 0.951, 0.935, 0.924, 0.893, 0.892, 0.865, 0.863, 
                          0.860, 0.856, 0.854, 0.835, 0.826, 0.816, 0.798, 0.765, 0.763, 0.67]),
            "labels": ["家政、家教、保姆等生活服务", "飞机票、火车票", "家具", "手机、手机配件", 
                      "计算机及其配套产品", "汽车用品", "通信充值、游戏充值", "个人护理用品", 
                      "书报杂志及音像制品", "餐饮、旅游、住宿", "家用电器", 
                      "食品、饮料、烟酒、保健品", "家庭日杂用品", "保险、演出票务", 
                      "服装、鞋帽、家用纺织品", "数码产品", "其他商品和服务", "工艺品、收藏品"]
        }
    
    elif chart_type == "堆积面积图":
        # 物流公司物流费用统计
        return {
            "x": np.arange(1, 13),
            "y_a": np.array([198, 215, 245, 222, 200, 236, 201, 253, 236, 200, 266, 290]),
            "y_b": np.array([203, 236, 200, 236, 269, 216, 298, 333, 301, 349, 360, 368]),
            "y_c": np.array([185, 205, 226, 199, 238, 200, 250, 209, 246, 219, 253, 288])
        }
    
    elif chart_type == "直方图":
        # 成绩分布直方图
        np.random.seed(42)
        return {
            "scores": np.random.randint(0, 100, 50)
        }
    
    elif chart_type == "饼图":
        # 数据分布饼图
        return {
            "data": np.array([20, 50, 10, 15, 30, 55]),
            "labels": ['A', 'B', 'C', 'D', 'E', 'F']
        }
    
    elif chart_type == "散点图":
        # 汽车速度与制动距离的关系
        return {
            "x": np.arange(10, 210, 10),
            "y": np.array([0.5, 2.0, 4.4, 7.9, 12.3, 17.7, 24.1, 31.5, 39.9, 49.2,
                          59.5, 70.8, 83.1, 96.4, 110.7, 126.0, 142.2, 159.4, 177.6, 196.8])
        }
    
    elif chart_type == "箱形图":
        # 2017年和2018年全国发电量统计
        return {
            "data_2018": np.array([5200, 5254.5, 5283.4, 5107.8, 5443.3, 5550.6, 
                                  6400.2, 6404.9, 5483.1, 5330.2, 5543, 6199.9]),
            "data_2017": np.array([4605.2, 4710.3, 5168.9, 4767.2, 4947, 5203, 
                                  6047.4, 5945.5, 5219.6, 5038.1, 5196.3, 5698.6])
        }
    
    elif chart_type == "雷达图":
        # 霍兰德职业兴趣测试
        return {
            "data": np.array([[0.40, 0.32, 0.35, 0.30, 0.30, 0.88],
                             [0.85, 0.35, 0.30, 0.40, 0.40, 0.30],
                             [0.43, 0.89, 0.30, 0.28, 0.22, 0.30],
                             [0.30, 0.25, 0.48, 0.85, 0.45, 0.40],
                             [0.20, 0.38, 0.87, 0.45, 0.32, 0.28],
                             [0.34, 0.31, 0.38, 0.40, 0.92, 0.28]]),
            "labels": ['研究型(I)', '艺术型(A)', '社会型(S)', '企业型(E)', '传统型(C)', '现实型(R)']
        }
    
    elif chart_type == "误差棒图":
        # 测量数据误差棒图
        return {
            "x": np.arange(5),
            "y": (25, 32, 34, 20, 25),
            "y_offset": (3, 5, 2, 3, 3)
        }
    
    else:
        # 默认返回折线图数据
        return generate_sample_data("折线图")

def validate_data(data, chart_type):
    """验证数据格式是否正确"""
    try:
        if chart_type == "折线图":
            required_keys = ["x", "y_max", "y_min"]
            for key in required_keys:
                if key not in data:
                    return False, f"缺少必要字段: {key}"
        
        elif chart_type == "柱形图":
            required_keys = ["x", "y"]
            for key in required_keys:
                if key not in data:
                    return False, f"缺少必要字段: {key}"
        
        elif chart_type == "条形图":
            required_keys = ["x", "y", "labels"]
            for key in required_keys:
                if key not in data:
                    return False, f"缺少必要字段: {key}"
        
        # 其他图表类型的验证...
        
        return True, "数据验证通过"
    
    except Exception as e:
        return False, f"数据验证错误: {str(e)}"

def create_download_link(fig, chart_type, text, format='png'):
    """创建图表下载链接"""
    buf = BytesIO()
    fig.savefig(buf, format=format, dpi=300, bbox_inches='tight')
    buf.seek(0)
    
    # 编码为base64
    b64 = base64.b64encode(buf.read()).decode()
    
    # 创建下载链接
    href = f'<a href="data:image/{format};base64,{b64}" download="{chart_type}.{format}">{text}</a>'
    return href

def data_to_dataframe(data, chart_type):
    """将数据转换为DataFrame格式"""
    if chart_type == "折线图":
        df = pd.DataFrame({
            '天数': data['x'],
            '最高气温': data['y_max'],
            '最低气温': data['y_min']
        })
    
    elif chart_type == "柱形图":
        df = pd.DataFrame({
            '财年': ["FY2013", "FY2014", "FY2015", "FY2016", "FY2017", "FY2018", "FY2019"],
            'GMV': data['y']
        })
    
    elif chart_type == "条形图":
        df = pd.DataFrame({
            '商品种类': data['labels'],
            '替代率': data['x']
        })
    
    elif chart_type == "堆积面积图":
        df = pd.DataFrame({
            '月份': data['x'],
            '物流公司A': data['y_a'],
            '物流公司B': data['y_b'],
            '物流公司C': data['y_c']
        })
    
    elif chart_type == "直方图":
        df = pd.DataFrame({
            '分数': data['scores']
        })
    
    elif chart_type == "饼图":
        df = pd.DataFrame({
            '类别': data['labels'],
            '数值': data['data']
        })
    
    elif chart_type == "散点图":
        df = pd.DataFrame({
            '速度': data['x'],
            '制动距离': data['y']
        })
    
    elif chart_type == "箱形图":
        df = pd.DataFrame({
            '2018年发电量': data['data_2018'],
            '2017年发电量': data['data_2017']
        })
    
    elif chart_type == "雷达图":
        df = pd.DataFrame(data['data'], columns=data['labels'])
    
    elif chart_type == "误差棒图":
        df = pd.DataFrame({
            '样本': data['x'],
            '测量值': data['y'],
            '误差': data['y_offset']
        })
    
    else:
        df = pd.DataFrame(data)
    
    return df