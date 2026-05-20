package com.GoliSoda.Service;

import com.GoliSoda.DTO.*;
import com.GoliSoda.Entity.*;
import java.util.*;

public interface OrderService {

	OrderResponseDTO placeOrder(
	        OrderDTO dto);

	List<Order> getAllOrders();

	Order getOrderById(Long id);

	void deleteOrder(Long id);

	Order updateOrderStatus(Long orderId, OrderStatus status);
}