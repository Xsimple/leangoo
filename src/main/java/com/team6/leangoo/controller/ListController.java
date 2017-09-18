package com.team6.leangoo.controller;

import com.team6.leangoo.model.BoardList;
import com.team6.leangoo.model.List;
import com.team6.leangoo.service.ListService;
import com.team6.leangoo.util.AjaxResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/List")
public class ListController {
    private final ListService listService;

    @Autowired
    public ListController(ListService listService) {
        this.listService = listService;
    }

    @RequestMapping(value = "/newList", method = RequestMethod.POST)
    public AjaxResult newList(List list, BoardList boardList) {
        AjaxResult ajaxResult = new AjaxResult();
        try {
            ajaxResult.setData(listService.newList(list, boardList));
        } catch (Exception e) {
            e.printStackTrace();
            ajaxResult.seterrcode(10);
            ajaxResult.setinfo("操作失败");
        } finally {
            return ajaxResult;
        }
    }
    @RequestMapping(value = "/delList",method = RequestMethod.POST)
    public AjaxResult delList(List list){
        AjaxResult ajaxResult=new AjaxResult();
        try {
            ajaxResult.setData(listService.delList(list));
            ajaxResult.seterrcode(10);
            ajaxResult.setinfo("操作失败");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            return ajaxResult;
        }
    }
}
