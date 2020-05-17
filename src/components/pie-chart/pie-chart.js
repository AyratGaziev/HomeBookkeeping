import React, { Component } from 'react';
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import './pie-chart.css'

am4core.useTheme(am4themes_animated)

class PieChart extends Component {

    componentDidMount() {

        let chartReg = {}

        function createChart(chartName, chartType) {

            maybeDisposeChart(chartName)

            chartReg[chartName] = am4core.create(chartName, chartType)
            
            return chartReg[chartName]
        }

        function maybeDisposeChart(chartName) {
            if (chartReg[chartName]) {
              chartReg[chartName].dispose();
              delete chartReg[chartName];
            }
          }
        
        let chart = createChart(this.props.chartName, am4charts.PieChart)

        chart.legend = new am4charts.Legend()

        let data = []

        this.props.items.forEach(item => {
    
            if (data.findIndex((i) => i.category === item.category) < 0) {
        
                return data.push({category: item.category, value: item.sum})
        
            } 
        
            data.forEach(el => {     
                           
                if(el.category === item.category ) {
        
                    const sum = Number(el.value) + Number(item.sum)   
                    
                    return  el.value = sum
                } 
            })
        
        })
        

        chart.data = data
        // chart.colors.list = [
        //     am4core.color("#FF4A00")
        // ]   

        let series = chart.series.push(new am4charts.PieSeries())
        series.dataFields.value = 'value'
        series.dataFields.category = 'category'

        chart.padding(30,30,30,30)
        
        this.chart = chart
    }
    componentDidUpdate(prevProps) {
        if(prevProps.items !== this.props.items) {
            let data = []

            this.props.items.forEach(element => {
                data.push({category: element.category, value: element.sum})
            });

            this.chart.data = data
        }
    }
    
    componentWillUnmount() {
        if(this.chart) {
            this.chart.dispose()
        }
    }

    render() {
        return (
            <div className = 'pie-chart'>
                <div className = 'pie-chart__title'> {this.props.title} </div>
                <div className = 'pie-chart__chart' id = {this.props.chartName} ></div>
            </div>
        );
    }
}

export default PieChart;
