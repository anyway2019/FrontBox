

function findKMax(arr,k){
    // bubble sort arr
    for(let i =0;i<=arr.length;i++)
    {
        let j = i+1;
        if(j<arr.length)
        {
            if(arr[j] > arr[i]){
                arr[i],arr[j] = arr[j],arr[i];
            }
        }
    }
    //快速排序

    //堆排序

    return arr[k];
}

function quickSort(arr,l,r){
    if(l< r){
        let q = partionby(arr,l,r)
        quickSort(arr,low,q-1);
        quickSort(arr,q+1,r)
    }
}

function partionby(arr,low,high){
    let pivot = arr[high];
    let i = low - 1;
    for(let j = low;j< high;j++)
    {
        if(arr[j]<pivot)
        {
            i++;
            var temp = arr[i];
            arr[i]=arr[j];
            arr[j] = temp;
        }
    }

}

function distance(arr){

}