// 第二章数据可视化图表功能 - 支持10种图表类型
class DataVisualization {
    constructor() {
        this.charts = [];
        this.currentChart = 0;
        this.chartTypes = [
            "折线图", "柱形图", "条形图", "堆积面积图", "直方图",
            "饼图", "散点图", "箱形图", "雷达图", "误差棒图"
        ];
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
            data: {
                labels: Array.from({length: 15}, (_, i) => `Day ${i + 1}`),
                datasets: [{
                    label: '最高气温 (°C)',
                    data: [25, 28, 30, 27, 26, 29, 31, 33, 32, 30, 28, 29, 31, 32, 34],
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    tension: 0.4
                }, {
                    label: '最低气温 (°C)',
                    data: [18, 20, 22, 19, 17, 21, 23, 25, 24, 22, 20, 21, 23, 24, 26],
                    borderColor: '#4ecdc4',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    tension: 0.4
                }]
            },
            description: "显示数据变化趋势，适用于时间序列数据"
        });

        // 2. 柱形图 - 2013-2019财年阿里巴巴GMV统计
        this.charts.push({
            type: "柱形图",
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
            description: "比较不同类别的数值，适用于分类数据比较"
        });

        // 3. 条形图 - 各商品种类的网购替代率
        this.charts.push({
            type: "条形图",
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
            description: "水平排列的分类数据比较，适用于长标签数据"
        });

        // 4. 堆积面积图 - 物流公司物流费用统计
        this.charts.push({
            type: "堆积面积图",
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: '顺丰',
                    data: [120, 135, 128, 142],
                    backgroundColor: 'rgba(255, 99, 132, 0.6)'
                }, {
                    label: '圆通',
                    data: [80, 92, 85, 98],
                    backgroundColor: 'rgba(54, 162, 235, 0.6)'
                }, {
                    label: '中通',
                    data: [95, 108, 102, 115],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)'
                }]
            },
            description: "显示多系列累积变化，适用于部分与整体关系"
        });

        // 5. 直方图 - 成绩分布统计
        this.charts.push({
            type: "直方图",
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
            description: "显示数据分布情况，适用于连续数据分布"
        });

        // 6. 饼图 - 数据分布比例
        this.charts.push({
            type: "饼图",
            data: {
                labels: ['A类数据', 'B类数据', 'C类数据', 'D类数据', 'E类数据'],
                datasets: [{
                    data: [25, 20, 30, 15, 10],
                    backgroundColor: [
                        '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'
                    ]
                }]
            },
            description: "显示各部分占整体的比例，适用于百分比数据"
        });

        // 7. 散点图 - 汽车速度与制动距离
        this.charts.push({
            type: "散点图",
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
            description: "显示两个变量之间的关系，适用于相关性分析"
        });

        // 8. 箱形图 - 2017年和2018年全国发电量统计
        this.charts.push({
            type: "箱形图",
            data: {
                labels: ['2017年', '2018年'],
                datasets: [{
                    label: '发电量 (亿千瓦时)',
                    data: [
                        [5800, 6200, 6500, 6800, 7200], // 2017年
                        [6100, 6600, 6900, 7300, 7600]  // 2018年
                    ],
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)'
                }]
            },
            description: "显示数据分布特征，适用于统计数据分析"
        });

        // 9. 雷达图 - 霍兰德职业兴趣测试
        this.charts.push({
            type: "雷达图",
            data: {
                labels: ['现实型', '研究型', '艺术型', '社会型', '企业型', '常规型'],
                datasets: [{
                    label: '兴趣得分',
                    data: [85, 70, 60, 90, 75, 65],
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)'
                }]
            },
            description: "多维数据的可视化，适用于多维度评估"
        });

        // 10. 误差棒图 - 测量数据误差
        this.charts.push({
            type: "误差棒图",
            data: {
                labels: ['实验1', '实验2', '实验3', '实验4', '实验5'],
                datasets: [{
                    label: '测量值',
                    data: [45, 52, 48, 55, 50],
                    backgroundColor: '#e15f41',
                    errorBars: {
                        '实验1': {plus: 3, minus: 2},
                        '实验2': {plus: 4, minus: 3},
                        '实验3': {plus: 2, minus: 2},
                        '实验4': {plus: 5, minus: 4},
                        '实验5': {plus: 3, minus: 3}
                    }
                }]
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
        
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const chartData = this.charts[this.currentChart];
        
        // 更新图表信息
        chartInfo.innerHTML = `
            <h3>${chartData.type}</h3>
            <p><strong>描述:</strong> ${chartData.description}</p>
            <p><strong>数据点:</strong> ${this.getDataPointCount(chartData)}</p>
            <p><strong>数据类型:</strong> ${this.getDataType(chartData)}</p>
        `;
        
        this.drawBasicChart(ctx, chartData);
    }

    getDataPointCount(chartData) {
        if (chartData.data.datasets[0].data) {
            return chartData.data.datasets[0].data.length;
        }
        return '多个';
    }

    getDataType(chartData) {
        const type = chartData.type;
        if (['折线图', '堆积面积图'].includes(type)) return '时间序列';
        if (['柱形图', '条形图', '饼图'].includes(type)) return '分类数据';
        if (['直方图', '箱形图'].includes(type)) return '统计分布';
        if (['散点图', '误差棒图'].includes(type)) return '相关性数据';
        if (type === '雷达图') return '多维评估';
        return '通用数据';
    }

    drawBasicChart(ctx, chartData) {
        const width = canvas.width;
        const height = canvas.height;
        const margin = 50;
        
        // 绘制背景
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        // 绘制标题
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(chartData.type, width / 2, 30);
        
        // 绘制简单的图表示意
        this.drawChartPreview(ctx, chartData, margin, margin + 40, width - 2*margin, height - 2*margin - 40);
    }

    drawChartPreview(ctx, chartData, x, y, w, h) {
        const data = chartData.data.datasets[0].data;
        const maxVal = Math.max(...data);
        const scale = h / maxVal * 0.8;
        
        ctx.strokeStyle = '#4ecdc4';
        ctx.fillStyle = 'rgba(78, 205, 196, 0.3)';
        ctx.lineWidth = 2;
        
        if (chartData.type === '折线图') {
            this.drawLineChart(ctx, data, x, y, w, h, scale);
        } else if (chartData.type === '柱形图') {
            this.drawBarChart(ctx, data, x, y, w, h, scale);
        } else if (chartData.type === '饼图') {
            this.drawPieChart(ctx, data, x + w/2, y + h/2, Math.min(w, h) * 0.4);
        } else {
            // 通用图表绘制
            this.drawGenericChart(ctx, data, x, y, w, h, scale);
        }
    }

    drawLineChart(ctx, data, x, y, w, h, scale) {
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
            
            // 绘制数据点
            ctx.fillStyle = '#ff6b6b';
            ctx.beginPath();
            ctx.arc(xPos, yPos, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        ctx.stroke();
    }

    drawBarChart(ctx, data, x, y, w, h, scale) {
        const barWidth = w / data.length * 0.8;
        const spacing = w / data.length * 0.2;
        
        data.forEach((value, i) => {
            const xPos = x + i * (barWidth + spacing);
            const barHeight = value * scale;
            
            ctx.fillStyle = '#45b7d1';
            ctx.fillRect(xPos, y + h - barHeight, barWidth, barHeight);
            
            ctx.strokeStyle = '#2a9bbf';
            ctx.strokeRect(xPos, y + h - barHeight, barWidth, barHeight);
        });
    }

    drawPieChart(ctx, data, cx, cy, radius) {
        const total = data.reduce((sum, val) => sum + val, 0);
        let startAngle = 0;
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
        
        data.forEach((value, i) => {
            const sliceAngle = (value / total) * 2 * Math.PI;
            
            ctx.fillStyle = colors[i % colors.length];
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();
            
            startAngle += sliceAngle;
        });
    }

    drawGenericChart(ctx, data, x, y, w, h, scale) {
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
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new DataVisualization();
});