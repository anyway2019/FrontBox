url
   ->response
        ->html
            ->dom
                ->dom with css
                    -> layout
                        -> render
                            ->bitmap

## 解析response text （response 分段接受分段解析）
## 根据解析创建DOM节点
## 根据css进行compute构建DOM layout tree
## 对布局树根据渲染合成层的流程尽心render成bitmap显示到显示器上


## css 优先级  【specificity】计算逻辑
```JS
function computeSpecificity(selector){
    var p = [0,0,0,0];
    for(var part of selectot){
        if(part.charAt(0) == "#"){
            p[1] += 1;
        }else if(part.charAt(0) === "."){
            p[2] += 1;
        }else{
            p[3] += 1;
        }
    }
    return p;
}
```

