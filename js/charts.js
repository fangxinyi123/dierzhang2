// 第二章数据可视化图表功能 - 使用Chart.js实现真正的交互式图表
class DataVisualization {
    constructor() {
        this.charts = [];
        this.currentChart = 0;
        this.chartTypes = [
            "折线图", "柱形图", "条形图", "堆积面积图", "直方图",
            "饼图", "散点图", "箱形图", "雷达图", "误差棒图"
        ];
        this.chartInstance = null;
        this.init();
    }

    init() {
        this.createAllCharts();
        this.setupEventListeners();
        this.renderChart();
    }

    createAllCharts() {
        // 1. 折线图 - 未来15天最高气温和最低气温
        this.charts.push({
            type: "折线图",
            config: {
                type: 'line',
                data: {
                    labels: Array.from({length: 15}, (_, i) => `Day ${i + 1}`),
                    datasets: [{
                        label: '最高气温 (°C)',
                        data: [25, 28, 30, 27, 26, 29, 31, 33, 32, 30, 28, 29, 31, 32, 34],
                        borderColor: '#ff6b6b',
                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: '最低气温 (°C)',
                        data: [18, 20, 22, 19, 17, 21, 23, 25, 24, 22, 20, 21, 23, 24, 26],
                        borderColor: '#4ecdc4',
                        backgroundColor: 'rgba(78, 205, 196, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '未来15天气温变化趋势'
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: '温度 (°C)'
                            }
                        }
                    }
                }
            },
            description: "显示数据变化趋势，适用于时间序列数据"
        });

        // 2. 柱形图 - 2013-2019财年阿里巴巴GMV统计
        this.charts.push({
            type: "柱形图",
            config: {
                type: 'bar',
                data: {
                    labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019'],
                    datasets: [{
                        label: 'GMV (亿元)',
                        data: [1070, 2270, 2940, 3090, 3760, 4820, 5720],
                        backgroundColor: '#45b7d1',
                        borderColor: '#2a9bbf',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '阿里巴巴GMV年度统计'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'GMV (亿元)'
                            }
                        }
                    }
                }
            },
            description: "比较不同类别的数值，适用于分类数据比较"
        });

        // 3. 条形图 - 各商品种类的网购替代率
        this.charts.push({
            type: "条形图",
            config: {
                type: 'bar',
                data: {
                    labels: ['服装', '电子产品', '食品', '家居', '图书', '化妆品'],
                    datasets: [{
                        label: '替代率 (%)',
                        data: [85, 78, 45, 62, 90, 82],
                        backgroundColor: '#96ceb4',
                        borderColor: '#7bb899',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '各商品种类网购替代率'
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: '替代率 (%)'
                            }
                        }
                    }
                }
            },
            description: "水平排列的分类数据比较，适用于长标签数据"
        });

        // 4. 堆积面积图 - 物流公司物流费用统计
        this.charts.push({
            type: "堆积面积图",
            config: {
                type: 'line',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [{
                        label: '顺丰',
                        data: [120, 135, 128, 142],
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        fill: true
                    }, {
                        label: '圆通',
                        data: [80, 92, 85, 98],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        fill: true
                    }, {
                        label: '中通',
                        data: [95, 108, 102, 115],
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '物流公司季度费用统计'
                        }
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: '季度'
                            }
                        },
                        y: {
                            stacked: true,
                            title: {
                                display: true,
                                text: '费用 (万元)'
                            }
                        }
                    }
                }
            },
            description: "显示多系列累积变化，适用于部分与整体关系"
        });

        // 5. 饼图 - 数据分布比例
        this.charts.push({
            type: "饼图",
            config: {
                type: 'pie',
                data: {
                    labels: ['A类数据', 'B类数据', 'C类数据', 'D类数据', 'E类数据'],
                    datasets: [{
                        data: [25, 20, 30, 15, 10],
                        backgroundColor: [
                            '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '数据分布比例'
                        },
                        legend: {
                            position: 'right'
                        }
                    }
                }
            },
            description: "显示各部分占整体的比例，适用于百分比数据"
        });

        // 6. 散点图 - 汽车速度与制动距离
        this.charts.push({
            type: "散点图",
            config: {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: '速度 vs 制动距离',
                        data: [
                            {x: 30, y: 10}, {x: 40, y: 16}, {x: 50, y: 25},
                            {x: 60, y: 36}, {x: 70, y: 49}, {x: 80, y: 64},
                            {x: 90, y: 81}, {x: 100, y: 100}
                        ],
                        backgroundColor: '#6a89cc',
                        pointRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '汽车速度与制动距离关系'
                        }
                    },
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            title: {
                                display: true,
                                text: '速度 (km/h)'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: '制动距离 (m)'
                            }
                        }
                    }
                }
            },
            description: "显示两个变量之间的关系，适用于相关性分析"
        });

        // 7. 雷达图 - 霍兰德职业兴趣测试
        this.charts.push({
            type: "雷达图",
            config: {
                type: 'radar',
                data: {
                    labels: ['现实型', '研究型', '艺术型', '社会型', '企业型', '常规型'],
                    datasets: [{
                        label: '兴趣得分',
                        data: [85, 70, 60, 90, 75, 65],
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        pointBackgroundColor: 'rgba(255, 159, 64, 1)'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '霍兰德职业兴趣测试结果'
                        }
                    },
                    scales: {
                        r: {
                            angleLines: {
                                display: true
                            },
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }
                }
            },
            description: "多维数据的可视化，适用于多维度评估"
        });

        // 8. 直方图 - 成绩分布统计
        this.charts.push({
            type: "直方图",
            config: {
                type: 'bar',
                data: {
                    labels: ['0-60', '60-70', '70-80', '80-90', '90-100'],
                    datasets: [{
                        label: '学生人数',
                        data: [5, 12, 25, 18, 8],
                        backgroundColor: '#feca57',
                        borderColor: '#fd9644',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '学生成绩分布统计'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '学生人数'
                            }
                        }
                    }
                }
            },
            description: "显示数据分布情况，适用于连续数据分布"
        });

        // 9. 箱形图 - 使用分组柱形图替代
        this.charts.push({
            type: "箱形图",
            config: {
                type: 'bar',
                data: {
                    labels: ['2017年', '2018年'],
                    datasets: [{
                        label: '最小值',
                        data: [5800, 6100],
                        backgroundColor: 'rgba(153, 102, 255, 0.6)'
                    }, {
                        label: 'Q1',
                        data: [6200, 6600],
                        backgroundColor: 'rgba(153, 102, 255, 0.8)'
                    }, {
                        label: '中位数',
                        data: [6500, 6900],
                        backgroundColor: 'rgba(153, 102, 255, 1)'
                    }, {
                        label: 'Q3',
                        data: [6800, 7300],
                        backgroundColor: 'rgba(153, 102, 255, 0.8)'
                    }, {
                        label: '最大值',
                        data: [7200, 7600],
                        backgroundColor: 'rgba(153, 102, 255, 0.6)'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '全国发电量统计分布'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: '发电量 (亿千瓦时)'
                            }
                        }
                    }
                }
            },
            description: "显示数据分布特征，适用于统计数据分析"
        });

        // 10. 误差棒图 - 测量数据误差
        this.charts.push({
            type: "误差棒图",
            config: {
                type: 'bar',
                data: {
                    labels: ['实验1', '实验2', '实验3', '实验4', '实验5'],
                    datasets: [{
                        label: '测量值',
                        data: [45, 52, 48, 55, 50],
                        backgroundColor: '#e15f41'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '科学实验测量数据'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '测量值'
                            }
                        }
                    }
                }
            },
            description: "显示测量数据误差，适用于科学实验数据"
        });
    }

    setupEventListeners() {
        document.getElementById('prevChart').addEventListener('click', () => {
            this.showChart(this.currentChart - 1);
        });

        document.getElementById('nextChart').addEventListener('click', () => {
            this.showChart(this.currentChart + 1);
        });
    }

    showChart(index) {
        if (index < 0) index = this.charts.length - 1;
        if (index >= this.charts.length) index = 0;
        
        this.currentChart = index;
        this.renderChart();
    }

    renderChart() {
        const canvas = document.getElementById('chartCanvas');
        const ctx = canvas.getContext('2d');
        const chartInfo = document.getElementById('chartInfo');
        
        // 销毁之前的图表实例
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }
        
        const chartData = this.charts[this.currentChart];
        
        // 创建新的图表实例
        this.chartInstance = new Chart(ctx, chartData.config);
        
        // 更新图表信息
        chartInfo.innerHTML = `
            <h3>${chartData.type}</h3>
            <p><strong>描述:</strong> ${chartData.description}</p>
            <p><strong>交互功能:</strong> 悬停查看数据详情，点击图例切换数据系列</p>
            <p><strong>图表特性:</strong> 支持缩放、平移等交互操作</p>
        `;
        
        // 更新图表计数器
        this.updateChartCounter();
    }

    updateChartCounter() {
        const counter = document.querySelector('.chart-counter');
        if (counter) {
            counter.textContent = `图表 ${this.currentChart + 1}/${this.charts.length}`;
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new DataVisualization();
});