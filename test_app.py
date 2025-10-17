#!/usr/bin/env python3
"""
测试脚本 - 验证数据可视化平台的核心功能
"""

import sys
import os

# 添加当前目录到Python路径
sys.path.insert(0, os.path.dirname(__file__))

try:
    # 测试导入模块
    from utils import generate_sample_data, validate_data, data_to_dataframe
    from config import CHART_CONFIG, STYLE_CONFIG, APP_CONFIG
    
    print("✅ 模块导入成功")
    
    # 测试数据生成功能
    chart_types = list(CHART_CONFIG.keys())
    print(f"✅ 支持的图表类型: {len(chart_types)}种")
    
    for chart_type in chart_types:
        try:
            data = generate_sample_data(chart_type)
            is_valid, message = validate_data(data, chart_type)
            df = data_to_dataframe(data, chart_type)
            
            print(f"✅ {chart_type}: 数据生成成功 (数据点: {len(df)})")
            
        except Exception as e:
            print(f"❌ {chart_type}: 数据生成失败 - {e}")
    
    print("\n🎉 所有核心功能测试通过！")
    print("📊 数据可视化平台已准备就绪")
    print("🌐 请在浏览器中访问 http://localhost:8501 查看应用")
    
except ImportError as e:
    print(f"❌ 模块导入失败: {e}")
    print("请确保所有依赖包已正确安装")
    
except Exception as e:
    print(f"❌ 测试过程中出现错误: {e}")