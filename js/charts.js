// 第二章数据可视化图表功能
class DataVisualization {
    constructor() {
        this.charts = [];
        this.currentChart = 0;
        this.init();
    }

    init() {
        this.createCharts();
        this.setupEventListeners();
    }

    createCharts() {
        // 折线图数据
        const lineChartData = {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: '最高气温 (°C)',
                data: [25, 28, 30, 27, 26, 29, 31],
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.1)'
            }, {
                label: '最低气温 (°C)',
                data: [18, 20, 22, 19, 17, 21, 23],
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.1)'
            }]
        };

        // 柱形图数据
        const barChartData = {
            labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019'],
            datasets: [{
                label: 'GMV (亿元)',
                data: [1070, 2270, 2940, 3090, 3760, 4820, 5720],
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
        };

        this.charts = [lineChartData, barChartData];
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
        
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const chartData = this.charts[this.currentChart];
        this.drawBasicChart(ctx, chartData);
    }

    drawBasicChart(ctx, data) {
        const width = 600;
        const height = 400;
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        
        // 简单绘制逻辑
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.fillText(`图表类型: ${this.currentChart === 0 ? '折线图' : '柱形图'}`, 10, 20);
        ctx.fillText(`数据点数量: ${data.labels.length}`, 10, 40);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new DataVisualization();
});