// 简化的数据可视化图表功能
class SimpleDataVisualization {
    constructor() {
        this.charts = [];
        this.currentChart = 0;
        this.chartInstance = null;
        
        this.init();
    }

    init() {
        console.log('初始化SimpleDataVisualization...');
        this.createAllCharts();
        this.setupEventListeners();
        this.renderChart();
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
                        borderColor: '#ff6b6b',
                        backgroundColor: 'rgba(255, 107, 107, 0.1)'
                    }]
                },
                options: {
                    responsive: true,
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
                    responsive: true,
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

        // 3. 饼图
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
                    responsive: true,
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

        // 4. 散点图
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
                    responsive: true,
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

        // 5. 雷达图
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
                    responsive: true,
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
            this.chartInstance = new Chart(canvas, chartData.config);
            
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
            if (chartInfo) {
                chartInfo.innerHTML = `
                    <h3>${chartData.type}</h3>
                    <p><strong>描述:</strong> ${chartData.description}</p>
                    <p style="color: red;"><strong>错误:</strong> ${error.message}</p>
                `;
            }
        }
        
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

// 直接初始化
window.addEventListener('load', function() {
    console.log('页面加载完成，开始初始化图表...');
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js未加载！');
        document.getElementById('chartInfo').innerHTML = `
            <h3 style="color: red;">错误</h3>
            <p>Chart.js库未正确加载，请检查网络连接或刷新页面。</p>
        `;
        return;
    }
    
    new SimpleDataVisualization();
    console.log('图表初始化完成');
});