package com.GoliSoda.Service;

import java.util.*;
import com.GoliSoda.Entity.*;
import com.GoliSoda.Repository.*;
import com.GoliSoda.DTO.*;
import java.time.*;
import com.GoliSoda.CustomException.*;
import org.springframework.stereotype.*;
import lombok.*;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

	private final OrderRepository orderRepository;
	private final ProductRepository productRepository;

	@Override
	public OrderResponseDTO placeOrder(OrderDTO dto) {

		Order order = new Order();

		order.setShopName(dto.getShopName());

		order.setOwnerName(dto.getOwnerName());

		order.setPhone(dto.getPhone());

		order.setLocation(dto.getLocation());

		order.setOrderedAt(LocalDateTime.now());

		order.setStatus(OrderStatus.PENDING);

		List<OrderItem> items = dto.getItems().stream().map(itemDto -> {

			ProductEntity product = productRepository.findById(itemDto.getProductId())
					.orElseThrow(() -> new RuntimeException("Product not found"));

			OrderItem item = new OrderItem();

			item.setProduct(product);

			item.setQuantity(itemDto.getQuantity());

			item.setOrder(order);

			return item;

		}).toList();

		order.setItems(items);

		Order savedOrder = orderRepository.save(order);

		String whatsappUrl = generateWhatsAppUrl(savedOrder);

		return new OrderResponseDTO(

				savedOrder.getId(),

				savedOrder.getStatus().name(),

				whatsappUrl);
	}

	@Override
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

	@Override
	public Order getOrderById(Long id) {

		return orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
	}

	@Override
	public void deleteOrder(Long id) {

		Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));

		orderRepository.delete(order);
	}

	@Override
	public Order updateOrderStatus(Long orderId, OrderStatus status) {

		Order order = orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order not found"));

		order.setStatus(status);

		return orderRepository.save(order);
	}

	private String generateWhatsAppUrl(Order order) {

		String message = generateWhatsAppMessage(order);

		return "https://wa.me/8904862252?text=" + message;
	}
 
	private String generateWhatsAppMessage(Order order) {

		StringBuilder message = new StringBuilder();

		message.append("Hello Goli Soda Team,%0A%0A");

		message.append("New Bulk Order Request%0A%0A");

		message.append("Shop Name: ").append(order.getShopName()).append("%0A");

		message.append("Owner Name: ").append(order.getOwnerName()).append("%0A");

		message.append("Phone: ").append(order.getPhone()).append("%0A");

		message.append("Location: ").append(order.getLocation()).append("%0A%0A");

		message.append("Products:%0A");

		for (OrderItem item : order.getItems()) {

			message.append("- ").append(item.getProduct().getName()).append(" x ").append(item.getQuantity())
					.append("%0A");
		}

		return message.toString();
	}
}