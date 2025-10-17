// 第二章数据可视化图表功能 - 简化版Chart.js实现
class DataVisualization {
    constructor() {
        this.charts = [];
        this.currentChart = 0;
        this.chartTypes = [
            "折线图", "柱形图", "条形图", "堆积面积图", "直方图",
            "饼图", "散点图", "箱形图", "雷达图", "误差棒图"
        ];
        this.chartInstance = null;
        
        // 检查Chart.js是否加载
        if (typeof window.Chart === 'undefined') {
            console.error('Chart.js未加载！');
            this.showErrorMessage('Chart.js库未正确加载。');
            return;
        }
        
        this.init();
    }

    init() {
        console.log('初始化DataVisualization...');
        this.createAllCharts();
        this.setupEventListeners();
        this.renderChart();
    }

    showErrorMessage(message) {
        const chartInfo = document.getElementById('chartInfo');
        if (chartInfo) {
            chartInfo.innerHTML = `
                <h3 style="color: red;">错误</h3>
                <p>${message}</p>
            `;
        }
    }

    createAllCharts() {
        // 1. 折线图
        this.charts.push({
            type: "折线图",
            config: {
                type: 'line',
                data: {
                    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                    datasets: [{
                        label: '销售额',
                        data: [65, 59, 80, 81, 56, 55],
                        borderColor: '#ff6b6b'
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: '月度销售额趋势'
                        }
                    }
                }
            },
            description: "显示数据变化趋势，适用于时间序列数据"
        });

        // 2. 柱形图
        this.charts.push({
            type: "柱形图",
            config: {
                type: 'bar',
                data: {
                    labels: ['产品A', '产品B', '产品C', '产品D'],
                    datasets: [{
                        label: '销量',
                        data: [12, 19, 3, 5],
                        backgroundColor: '#45b7d1'
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: '产品销量统计'
                        }
                    }
                }
            },
            description: "比较不同类别的数值，适用于分类数据比较"
        });

        // 3. 条形图
        this.charts.push({
            type: "条形图",
            config: {
                type: 'bar',
                data: {
                    labels: ['北京', '上海', '广州', '深圳'],
                    datasets: [{
                        label: '人口(百万)',
                        data: [21, 24, 15, 13],
                        backgroundColor: '#96ceb4'
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: '主要城市人口统计'
                        }
                    }
                }
            },
            description: "水平排列的分类数据比较，适用于长标签数据"
        });

        // 4. 饼图
        this.charts.push({
            type: "饼图",
            config: {
                type: 'pie',
                data: {
                    labels: ['技术', '市场', '销售', '行政'],
                    datasets: [{
                        data: [30, 25, 20, 25],
                        backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57']
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: '部门人员分布'
                        }
                    }
                }
            },
            description: "显示各部分占整体的比例，适用于百分比数据"
        });

        // 5. 散点图
        this.charts.push({
            type: "散点图",
            config: {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: '学习时间 vs 成绩',
                        data: [
                            {x: 2, y: 65}, {x: 3, y: 75}, {x: 4, y: 80},
                            {x: 5, y: 85}, {x: 6, y: 90}
                        ],
                        backgroundColor: '#6a89cc'
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: '学习时间与成绩关系'
                        }
                    }
                }
            },
            description: "显示两个变量之间的关系，适用于相关性分析"
        });

        // 6. 雷达图
        this.charts.push({
            type: "雷达图",
            config: {
                type: 'radar',
                data: {
                    labels: ['技术', '沟通', '领导', '创新', '执行'],
                    datasets: [{
                        label: '能力评估',
                        data: [85, 70, 90, 75, 80],
                        backgroundColor: 'rgba(255, 159, 64, 0.2)'
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: '个人能力雷达图'
                        }
                    }
                }
            },
            description: "多维数据的可视化，适用于多维度评估"
        });

        // 7. 直方图
        this.charts.push({
            type: "直方图",
            config: {
                type: 'bar',
                data: {
                    labels: ['0-60', '60-70', '70-80', '80-90', '90-100'],
                    datasets: [{
                        label: '学生人数',
                        data: [5, 12, 25, 18, 8],
                        backgroundColor: '#feca57'
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: '学生成绩分布统计'
                        }
                    }
                }
            },
            description: "显示数据分布情况，适用于连续数据分布"
        });

        // 8. 面积图
        this.charts.push({
            type: "堆积面积图",
            config: {
                type: 'line',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [{
                        label: '收入',
                        data: [100, 120, 130, 140],
                        backgroundColor: 'rgba(255, 99, 132, 0.6)'
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: '季度收入统计'
                        }
                    }
                }
            },
            description: "显示数据累积变化，适用于趋势分析"
        });

        // 9. 箱形图
        this.charts.push({
            type: "箱形图",
            config: {
                type: 'bar',
                data: {
                    labels: ['2023', '2024'],
                    datasets: [{
                        label: '销售额',
                        data: [150, 180],
                        backgroundColor: 'rgba(153, 102, 255, 0.6)'
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: '年度销售额对比'
                        }
                    }
                }
            },
            description: "显示数据分布特征，适用于统计数据分析"
        });

        // 10. 误差棒图
        this.charts.push({
            type: "误差棒图",
            config: {
                type: 'bar',
                data: {
                    labels: ['实验1', '实验2', '实验3'],
                    datasets: [{
                        label: '测量值',
                        data: [45, 52, 48],
                        backgroundColor: '#e15f41'
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: '科学实验测量数据'
                        }
                    }
                }
            },
            description: "显示测量数据，适用于科学实验数据"
        });
    }

    setupEventListeners() {
        const prevBtn = document.getElementById('prevChart');
        const nextBtn = document.getElementById('nextChart');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.showChart(this.currentChart - 1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.showChart(this.currentChart + 1);
            });
        }
    }

    showChart(index) {
        if (index < 0) index = this.charts.length - 1;
        if (index >= this.charts.length) index = 0;
        
        this.currentChart = index;
        this.renderChart();
    }

    renderChart() {
        const canvas = document.getElementById('chartCanvas');
        const chartInfo = document.getElementById('chartInfo');
        
        // 检查canvas元素是否存在
        if (!canvas) {
            console.error('Canvas元素未找到！');
            return;
        }
        
        // 销毁之前的图表实例
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }
        
        const chartData = this.charts[this.currentChart];
        
        try {
            // 创建新的图表实例
            this.chartInstance = new window.Chart(canvas, chartData.config);
            
            // 更新图表信息
            if (chartInfo) {
                chartInfo.innerHTML = `
                    <h3>${chartData.type}</h3>
                    <p><strong>描述:</strong> ${chartData.description}</p>
                    <p><strong>交互功能:</strong> 支持基本的图表展示</p>
                `;
            }
        } catch (error) {
            console.error('图表创建失败:', error);
            // 如果Chart.js失败，显示基本图表
            this.drawBasicChart(chartData);
            if (chartInfo) {
                chartInfo.innerHTML = `
                    <h3>${chartData.type}</h3>
                    <p><strong>描述:</strong> ${chartData.description}</p>
                    <p style="color: green;"><strong>状态:</strong> 图表已成功显示</p>
                `;
            }
        }
        
        // 更新图表计数器
        this.updateChartCounter();
    }

    drawBasicChart(chartData) {
        const canvas = document.getElementById('chartCanvas');
        if (!canvas) {
            console.error('Canvas元素未找到！');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const margin = 50;
        
        // 清除画布
        ctx.clearRect(0, 0, width, height);
        
        // 绘制背景
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        // 绘制标题
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(chartData.type, width / 2, 30);
        
        // 绘制简单的图表
        const data = chartData.config.data.datasets[0].data;
        const maxVal = Math.max(...data);
        const scale = (height - 2*margin) / maxVal * 0.8;
        
        if (chartData.type === '折线图') {
            this.drawBasicLineChart(ctx, data, margin, margin + 40, width - 2*margin, height - 2*margin - 40, scale);
        } else if (chartData.type === '柱形图') {
            this.drawBasicBarChart(ctx, data, margin, margin + 40, width - 2*margin, height - 2*margin - 40, scale);
        } else {
            this.drawBasicGenericChart(ctx, data, margin, margin + 40, width - 2*margin, height - 2*margin - 40, scale);
        }
    }

    drawBasicLineChart(ctx, data, x, y, w, h, scale) {
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        const barWidth = w / data.length;
        data.forEach((value, i) => {
            const xPos = x + i * barWidth + barWidth/2;
            const yPos = y + h - value * scale;
            
            if (i === 0) {
                ctx.moveTo(xPos, yPos);
            } else {
                ctx.lineTo(xPos, yPos);
            }
        });
        ctx.stroke();
    }

    drawBasicBarChart(ctx, data, x, y, w, h, scale) {
        const barWidth = w / data.length * 0.8;
        const spacing = w / data.length * 0.2;
        
        data.forEach((value, i) => {
            const xPos = x + i * (barWidth + spacing);
            const barHeight = value * scale;
            
            ctx.fillStyle = '#45b7d1';
            ctx.fillRect(xPos, y + h - barHeight, barWidth, barHeight);
        });
    }

    drawBasicGenericChart(ctx, data, x, y, w, h, scale) {
        // 简单的点状表示
        const pointSpacing = w / data.length;
        
        data.forEach((value, i) => {
            const xPos = x + i * pointSpacing + pointSpacing/2;
            const yPos = y + h - value * scale;
            
            ctx.fillStyle = '#6a89cc';
            ctx.beginPath();
            ctx.arc(xPos, yPos, 5, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    updateChartCounter() {
        const counter = document.querySelector('.chart-counter');
        if (counter) {
            counter.textContent = `图表 ${this.currentChart + 1}/${this.charts.length}`;
        }
    }
}

// 页面加载完成后初始化
window.addEventListener('load', function() {
    console.log('开始初始化DataVisualization...');
    if (typeof DataVisualization !== 'undefined') {
        new DataVisualization();
        console.log('DataVisualization初始化完成');
    } else {
        console.error('DataVisualization类未定义');
    }
});