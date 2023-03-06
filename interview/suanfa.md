# 反转链表 
```js

function reverseList(head){
    if(head === null || head.next === null){
        return head;
    }
    const last = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return last;
}
```
# 最长有效括号


# 两个有序数组 第k大



# b 是不是 a 的子树


```js
function isSubTree(root,subRoot){
    if(root ===null){
        return false
    }

    if(compare(root,subRoot)){
     return true
    }

    return isSubTree(root.left,subRoot) || isSubTree(root.right,subRoot);
}


function compare(left,right){

    if(left === null && right === null){
        return  true;
    }else if(left === null && right !== null || 
             right === null && left !== null ||
             left.val !== right.val
    ){
      return false
    }


    return compare(left.left,right.left) && compare(left.right,right.right)

}
```



# 接雨水