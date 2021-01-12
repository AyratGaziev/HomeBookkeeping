import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "./line-chart.css";

am4core.useTheme(am4themes_animated);

class LineChart extends Component {
    componentDidMount() {
        let chartReg = {};

        function createChart(chartName, chartType) {
            maybeDisposeChart(chartName);

            chartReg[chartName] = am4core.create(chartName, chartType);

            return chartReg[chartName];
        }

        function maybeDisposeChart(chartName) {
            if (chartReg[chartName]) {
                chartReg[chartName].dispose();
                delete chartReg[chartName];
            }
        }

        let chart = createChart(this.props.chartName, am4charts.XYChart);

        let data = [];

        this.props.items.forEach((element) => {
            data.push({ date: new Date(element.date), value: element.sum });
        });

        data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

        chart.data = data;
        chart.colors.list = [am4core.color("#FF4A00")];

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.draggable = "true";

        series.tooltipText = "{valueY.value}";
        chart.cursor = new am4charts.XYCursor();
        chart.padding(30, 30, 30, 30);

        series.strokeWidth = 3;
        let circleBullet = series.bullets.push(new am4charts.CircleBullet());
        circleBullet.circle.stroke = am4core.color("#fff");
        circleBullet.circle.strokeWidth = 2;

        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{value}";
        labelBullet.label.dy = -20;

        this.chart = chart;
    }
    componentDidUpdate(prevProps) {
        if (prevProps.items !== this.props.items) {
            let data = [];

            this.props.items.forEach((element) => {
                data.push({ date: new Date(element.date), value: element.sum });
            });

            data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

            this.chart.data = data;
        }
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <div className="line-chart">
                <div className="line-chart__title"> {this.props.title} </div>
                <div
                    className="line-chart__chart"
                    id={this.props.chartName}></div>
            </div>
        );
    }
}

export default LineChart;
